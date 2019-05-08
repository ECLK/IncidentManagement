export var events = [
    {
        initiator: {
            isAnonymous: false,
            avatar: "",
            userId: 1,
            displayname: "Manujith Pallewatte"
        },
        action: "GENERIC_UPDATE",
        incidentId: 1,
        created_date: Date()
    },
    {
        initiator: {
            isAnonymous: false,
            avatar: "",
            userId: 2,
            displayname: "Lahiru de Alwis"
        },
        action: "ATTRIBUTE_CHANGED",
        affected_attribute: "STATUS",
        incidentId: 1,
        data: {
            status: {
                status_type: "ACTION_TAKEN"
            }
        },
        created_date: Date()
    },
    {
        initiator: {
            isAnonymous: false,
            avatar: "",
            userId: 3,
            displayname: "Achala Dissanayake"
        },
        action: "COMMENTED",
        incidentId: 1,
        data: {
            comment: {
                body: "This is a smol comment"
            }
        },
        created_date: Date()
    },
    {
        initiator: {
            isAnonymous: false,
            avatar: "",
            userId: 4,
            displayname: "Clement Fernando"
        },
        action: "MEDIA_ATTACHED",
        incidentId: 1,
        data: {
            media: {
                type: "document",
                ext: ".pdf",
                url: "http://example.com"
            }
        },
        created_date: Date()
    },
];
