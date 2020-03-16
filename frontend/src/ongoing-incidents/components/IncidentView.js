import React, { Component, cloneElement, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import EditIcon from '@material-ui/icons/Edit';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

import EventList from './EventTrail/EventList';
import Editor from './EventTrail/RichTextEditor'

import SummaryTabView from './IncidentSummaryView';

import {
    attachFile,
    attachFileRequest
} from '../state/OngoingIncidents.actions';
import { EventActions } from './EventTrail'
import {showModal} from '../../modals/state/modal.actions'
import { userCan, USER_ACTIONS } from '../../user/userUtils';
import FileUploader from '../../files/components/FilePicker';

// actions
import { loadIncident, updateIncidentStatus } from '../../incident/state/incidentActions';
import { getIncidentEvents } from '../../event/state/eventActions';
import { showNotification } from '../../notifications/state/notifications.actions'

const styles = theme => ({
    label: {
        // color: '#757575'
    },
    editButtonWrapper: {
        marginBottom: theme.spacing.unit * 2,
        display: 'flex',
        justifyContent: 'space-around',
        flexGrow: 1

    },
    editButton: {
        flexGrow: 1,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit

    },
    verifiedButton:{
        color:'#4caf50',
        border: 'solid 1px',
        borderColor: '#4caf50',
        width:'49%',
        borderRadius:4,
        fontSize: '14px',
        fontWeight: 500,
    },
    sidePane: {
        marginLeft: theme.spacing.unit * 4

    },
    mainArea: {
        marginLeft: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 20
    },
    verifyIncidentDialog: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    editIcon: {
        marginRight: theme.spacing.unit * 1,
    },
    verifiedIcon:{
        marginRight: theme.spacing.unit * 1,
    },
    textEditorWrapper:{
        paddingLeft: theme.spacing.unit * 9,
        paddingRight: theme.spacing.unit * 4
    },
    uploadButtonWrapper:{
        display:'flex',
        flexGrow:1,
        flexDirection:'row-reverse'
    }
});


/**
 * Tabular componenet
 */
function NavTabs({ classes, match }) {
    const [election, setElection] = useState({
        id: 1,
        name: "Provincial Election 2019",
    });

    const [category, setCategory] = useState({
        id: 11,
        top_category: "Violence",
        sub_category: "Interrupting propaganda"
    });

    const [files, setFiles] = useState([]);
    const [activeIncident, setActiveIncident] = useState(null);
    const [activeReporter, setActiveReporter] = useState(null);

    const sharedState = useSelector(state => state.shared);
    const {
        provinces, districts,
        institutions,
        divisionalSecretariats,
        gramaNiladharis,
        pollingDivisions,
        pollingStations,
        policeStations,
        policeDivisions,
        elections,
        channels,
        categories,
    } = sharedState;

    const incidents = useSelector(state => state.incident.incidents);
    const reporters = useSelector(state => state.incident.reporters);
    const events = useSelector(state => state.event.events);
    const users = useSelector(state => state.user.users);
    const organizations = useSelector(state => state.user.organizations);
    const divisions = useSelector(state => state.user.divisions);
    const activeUser = useSelector(state => state.shared.signedInUser.data);

    const dispatch = useDispatch();
    const changeStatus = (incidentId, status) => dispatch(updateIncidentStatus(incidentId, status));
    // const onEscalateClick = () => dispatch(showModal('ESCALATE_MODAL', { incidentId: activeIncident.id }));
    const onVerifyClick = () => dispatch(showModal('VERIFY_CONFIRM_MODAL', { incidentId: activeIncident.id }));
    const attachFiles = (incidentId, formData) => dispatch(attachFile(incidentId, formData));
    const onResolveEvent = (eventId, decision) => { /* do nothing, event resolving is depreciated */ }

    const modalActionOnVerify = (modalType) => {
        if (activeIncident.currentStatus != "NEW"){
            switch (modalType) {
                case 'ESCALATE_MODAL':
                    dispatch(showModal('ESCALATE_MODAL', { incidentId: activeIncident.id }))
                    break
                case 'ESCALLATE_OUTSIDE':
                    dispatch(showModal('ESCALLATE_OUTSIDE', { incidentId: activeIncident.id }))
                    break
                case 'CLOSE_MODAL':
                    dispatch(showModal('CLOSE_MODAL', { activeIncident }))
                    break
                case 'RESPONSE_TIME_EDIT':
                    dispatch(showModal('RESPONSE_TIME_EDIT', { activeIncident }))
                    break
                case 'CHANGE_ASSIGNEE_MODAL':
                    dispatch(showModal('CHANGE_ASSIGNEE_MODAL', { activeIncident, users, divisions }))
                    break

                default:
                    break;
            }
        } else {
            dispatch(showNotification({ message: "Incident must be verified to proceed." }, null))
        }
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        const incidentId = match.params.paramIncidentId;
        if(!incidents.byIds[incidentId] || !reporters.byIds[incidents.byIds[incidentId].reporter]){
            dispatch(loadIncident(incidentId));
        }else{
            const incident = incidents.byIds[incidentId];
            setActiveIncident(incident);
            setActiveReporter(reporters.byIds[incident.reporter]);
        }
        dispatch(getIncidentEvents(incidentId));
    }, [incidents]);

    useEffect(() => {
        // dispatch(fetchAllUsers());
        scrollToTop();
    }, []);

    const onUploadClick = () => {
        const formData = new FormData();
        for(var file of files){
            formData.append("files[]", file);
        }
        attachFiles(activeIncident.id, formData);
        setFiles([]);
    }

    const EditIncidentLink = props => <Link to={`/app/review/${activeIncident.id}/edit`} {...props} />

    if(!activeIncident){
        return <></>;
    }

    return(
        <NoSsr>
            <Grid container spacing={24} >
                <Grid item xs={9}>
                    <div className={classes.mainArea}>
                        <SummaryTabView
                            incident={activeIncident}
                            category={category}
                            election={election}
                            reporter={activeReporter}

                            institutions = {institutions}
                            provinces={provinces}
                            districts={districts}
                            divisionalSecretariats = {divisionalSecretariats}
                            gramaNiladharis = {gramaNiladharis}
                            pollingDivisions = {pollingDivisions}
                            pollingStations = {pollingStations}
                            policeStations = {policeStations}
                            policeDivisions = {policeDivisions}
                            elections ={elections}
                            channels = {channels}
                            categories = {categories}
                        />
                        <div>
                            <EventList
                                events={events}
                                resolveEvent={onResolveEvent}
                            />
                            {activeIncident.currentStatus !== 'CLOSED'  &&
                                activeIncident.currentStatus !== 'INVALIDATED'  &&
                                <div className={classes.textEditorWrapper}>
                                    <Editor
                                        activeIncident={activeIncident}
                                    />
                                    <FileUploader
                                        files={files}
                                        setFiles={setFiles}
                                        watchedActions={[
                                            attachFileRequest()
                                        ]}
                                    />
                                    <div className={classes.uploadButtonWrapper}>
                                    <Button disabled={!files.length} onClick={onUploadClick}>
                                        Upload
                                    </Button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.sidePane}>
                        <div className={classes.editButtonWrapper}>
                            {activeIncident.currentStatus !== 'CLOSED' && activeIncident.currentStatus !== 'INVALIDATED' &&
                                <>
                                    { (activeIncident.currentStatus != 'NEW' && activeIncident.currentStatus != 'REOPENED') &&
                                        <ButtonBase disabled variant="outlined"  size="large" color="secondary" className={classes.verifiedButton} >
                                            <DoneOutlineIcon className={classes.verifiedIcon}/>
                                            VERIFIED
                                        </ButtonBase>
                                    }
                                    {userCan(activeUser, activeIncident, USER_ACTIONS.CAN_RUN_WORKFLOW) &&
                                        <>
                                        { (activeIncident.currentStatus === 'NEW' || activeIncident.currentStatus === 'REOPENED') &&
                                            <Button variant="outlined" size="large" color="secondary" onClick={onVerifyClick} className={classes.editButton} >
                                                Verify
                                            </Button>
                                        }
                                        </>
                                    }
                                    <Button component={EditIncidentLink} variant="outlined" size="large" color="primary" className={classes.editButton} >
                                        <EditIcon className={classes.editIcon} />
                                        Edit
                                    </Button>
                                </>
                            }
                            {activeIncident.currentStatus === 'CLOSED' &&
                                <ButtonBase disabled variant="outlined"  size="large" color="primary" className={classes.verifiedButton} >
                                    CLOSED
                                </ButtonBase>
                            }
                            {activeIncident.currentStatus === 'INVALIDATED' &&
                                <ButtonBase disabled variant="outlined"  size="large" color="primary"  >
                                    INVALIDATED
                                </ButtonBase>
                            }
                        </div>
                        <EventActions
                            activeIncident={activeIncident}
                            onStatusChange={changeStatus}
                            activeUser={activeUser}
                            users={users}
                            organizations={organizations}
                            divisions={divisions}
                            events={events}
                            // escallateIncident={onEscalateClick}
                            modalAction={modalActionOnVerify}
                        />
                    </div>

                </Grid>
            </Grid>
        </NoSsr>
    )
}

NavTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);