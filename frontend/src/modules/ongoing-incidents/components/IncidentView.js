import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
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
import DropZone from './EventTrail/EventTrailDropZone'

import SummaryTabView from './IncidentSummaryView';

import {
    fetchIncidentEventTrail,
    submitIncidentComment,
    setIncidentStatus,
    setIncidentSeverity,
    resolveEvent,
    fetchAllUsers,
    setIncidentAssignee,
    fetchEscallateIncident,
    attachFile
} from '../state/OngoingIncidents.actions';
import { 
    fetchActiveIncidentData,
    fetchChannels,
    fetchElections,
    fetchCategories,
    fetchDistricts,
    fetchProvinces
} from '../../shared/state/Shared.actions';
import { EventActions } from './EventTrail'
import {showModal} from '../../modals/state/modal.actions'
import { userCan, USER_ACTIONS } from '../../utils/userUtils';
import FileUploader from '../../shared/components/FileUploader';

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
    }
});


/**
 * Tabular componenet
 */
class NavTabs extends Component {


    scrollToTop = () => {
        window.scrollTo(0, 0);
    }
    
    state = {
        value: 0,
        incident: null,
        election: {
            id: 1,
            name: "Provincial Election 2019",
        },
        category: {
            id: 11,
            top_category: "Violence",
            sub_category: "Interrupting propaganda"
        },
        isCommentVisible: false,
        files: []
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    componentDidMount() {
        const incidentId = this.props.match.params.paramIncidentId;
        if (incidentId) {
            this.props.getIncident(incidentId);
            this.props.getEvents(incidentId);
            this.props.getChannels();
            this.props.getElections();
            this.props.getCategories();
            this.props.getProvinces();
            this.props.getDistricts();
        }
        this.scrollToTop()
        this.props.getUsers();
    }

    showCommentInput = () => {
        this.setState({ isCommentVisible: true })
    }

    hideCommentInput = () => {
        this.setState({ isCommentVisible: false })
    }

    onResolveEvent = (eventId, decision) => {
        const { activeIncident } = this.props;

        this.props.resolveEventApproval(activeIncident.id, eventId, decision);
    }

    onVerifyClick = () => {
        this.props.showVerifyConfirmation(this.props.activeIncident.id)
    }

    onEscalateClick = () => {
        this.props.showEscalateModal(this.props.activeIncident.id);
    }

    onRequestAdviceClick = () => {
        this.props.showRequestAdviceModal(this.props.activeIncident.id, this.props.users);
    }

    onSelectFiles = (files) => {
        this.setState({
            files: files
        })
    }

    onUploadClick = () => {
        const formData = new FormData();
        for(var file of this.state.files){
            formData.append("files[]", file);
        }
        this.props.attachFiles(this.props.activeIncident.id, formData);
        this.setState({
            files: []
        })
    }

    render() {
        const { classes, postComment, activeIncident,
            reporter, changeStatus, changeSeverity,
            activeUser, users, getUsers,
            setIncidentAssignee, events,
            provinces, districts,
            divisionalSecretariats,
            gramaNiladharis,
            pollingDivisions,
            pollingStations,
            policeStations,
            policeDivisions,
            elections,
            channels,
            categories,
        } = this.props;

        const EditIncidentLink = props => <Link to={`/app/review/${activeIncident.id}/edit`} {...props} />

        return (
            <NoSsr>
                <Grid container spacing={24} >
                    <Grid item xs={9}>
                        <div className={classes.mainArea}>
                            <SummaryTabView 
                                incident={activeIncident}
                                category={this.state.category}
                                election={this.state.election}
                                reporter={reporter}

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
                                    events={this.props.events}
                                    resolveEvent={this.onResolveEvent}
                                />
                                {activeIncident.currentStatus !== 'CLOSED'  &&
                                    activeIncident.currentStatus !== 'INVALIDATED'  && 
                                    <div className={classes.textEditorWrapper}>
                                        <Editor/>
                                        {/* <DropZone/> */}
                                        <FileUploader 
                                            files={this.state.files}
                                            setFiles={this.onSelectFiles}
                                        />
                                        <Button disabled={!this.state.files.length} onClick={this.onUploadClick}>
                                            Upload
                                        </Button>

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
                                        {userCan(activeUser, activeIncident, USER_ACTIONS.RUN_WORKFLOW) &&
                                            <>
                                            {activeIncident.currentStatus !== 'NEW' &&
                                                <ButtonBase disabled variant="outlined"  size="large" color="secondary" className={classes.verifiedButton} >
                                                    <DoneOutlineIcon className={classes.verifiedIcon}/>
                                                    VERIFIED
                                                </ButtonBase>
                                            }
                                            {activeIncident.currentStatus === 'NEW' &&
                                                <Button variant="outlined" size="large" color="secondary" onClick={this.onVerifyClick} className={classes.editButton} >
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
                                onSeverityChange={changeSeverity}
                                activeUser={activeUser}
                                users={users}
                                getUsers={getUsers}
                                setIncidentAssignee={setIncidentAssignee}
                                events={this.props.events}
                                escallateIncident={this.onEscalateClick}
                            />
                        </div>

                    </Grid>
                </Grid>
            </NoSsr>
        );
    }
}

NavTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        events: state.ongoingIncidentReducer.events,
        activeIncident: state.sharedReducer.activeIncident.data,
        reporter: state.sharedReducer.activeIncidentReporter,
        provinces: state.sharedReducer.provinces,
        districts: state.sharedReducer.districts,
        divisionalSecretariats: state.sharedReducer.divisionalSecretariats ,
        gramaNiladharis: state.sharedReducer.gramaNiladharis ,
        pollingDivisions: state.sharedReducer.pollingDivisions ,
        pollingStations: state.sharedReducer.pollingStations ,
        policeStations: state.sharedReducer.policeStations ,
        policeDivisions: state.sharedReducer.policeDivisions ,
        channels: state.sharedReducer.channels ,
        elections: state.sharedReducer.elections ,
        categories: state.sharedReducer.categories,

        activeUser: state.sharedReducer.signedInUser.data,
        users: state.ongoingIncidentReducer.users,
        ...ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getIncident: (incidentId) => {
            dispatch(fetchActiveIncidentData(incidentId));
        },
        getEvents: (incidentId) => {
            dispatch(fetchIncidentEventTrail(incidentId));
        },
        postComment: (incidentId, commentData) => {
            dispatch(submitIncidentComment(incidentId, commentData));
        },
        changeStatus: (incidentId, status) => {
            dispatch(setIncidentStatus(incidentId, status))
        },
        changeSeverity: (incidentId, severity) => {
            dispatch(setIncidentSeverity(incidentId, severity))
        },
        resolveEventApproval: (incidentId, eventId, decision) => {
            dispatch(resolveEvent(incidentId, eventId, decision));
        },
        getUsers: () => {
            dispatch(fetchAllUsers());
        },
        setIncidentAssignee: (incidentId, uid, actionType) => {
            dispatch(setIncidentAssignee(incidentId, uid, actionType));
        },
        escallateIncident: (incidentId, assigneeId) => {
            dispatch(fetchEscallateIncident(incidentId, assigneeId))
        },
        showVerifyConfirmation: (incidentId) => {
            dispatch(showModal('VERIFY_CONFIRM_MODAL',{incidentId}))
        },
        showEscalateModal: (incidentId) => {
            dispatch(showModal('ESCALATE_MODAL', { incidentId }))
        },
        showRequestAdviceModal: (incidentId, users) => {
            dispatch(showModal('REQUEST_ADVICE_MODAL', { incidentId, users }))
        },
        getChannels: () => {
            dispatch(fetchChannels());
        },
        getElections: () => {
            dispatch(fetchElections());
        },
        getCategories: () => {
            dispatch(fetchCategories());
        },
        getProvinces: () => {
            dispatch(fetchProvinces());
        },
        getDistricts: () => {
            dispatch(fetchDistricts());
        },
        attachFiles: (incidentId, formData) => {
            dispatch(attachFile(incidentId, formData));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles))(NavTabs);