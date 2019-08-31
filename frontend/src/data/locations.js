export const provinces = [
    { id:1, code: "PRV1", name: "Central" },
    { id:2, code: "PRV2", name: "Eastern" },
    { id:3, code: "PRV3", name: "North Central" },
    { id:4, code: "PRV4", name: "Northern" },
    { id:5, code: "PRV5", name: "North Western" },
    { id:6, code: "PRV6", name: "Sabaragamuwa" },
    { id:7, code: "PRV7", name: "Southern" },
    { id:8, code: "PRV8", name: "Uva" },
    { id:9, code: "PRV9", name: "Western" },
];

export const districts = [
    { id:1, code: "DST01", name: "Kandy", province_id: 1 },
    { id:2, code: "DST02", name: "Matale", province_id: 1 },
    { id:3, code: "DST03", name: "Nuwara Eliya", province_id: 1 },
    { id:4, code: "DST04", name: "Ampara", province_id: 2 },
    { id:5, code: "DST05", name: "Batticaloa", province_id: 2 },
    { id:6, code: "DST06", name: "Trincomalee", province_id: 2 },
    { id:7, code: "DST07", name: "Anuradhapura", province_id: 3 },
    { id:8, code: "DST08", name: "Polonnaruwa", province_id: 3 },
    { id:9, code: "DST09", name: "Jaffna", province_id: 4 },
    { id:10, code: "DST10", name: "Kilinochchi", province_id: 4 },
    { id:11, code: "DST11", name: "Mannar", province_id: 4 },
    { id:12, code: "DST12", name: "Mullaitivu", province_id: 4 },
    { id:13, code: "DST13", name: "Vavuniya", province_id: 4 },
    { id:14, code: "DST14", name: "Kurunegala", province_id: 5 },
    { id:15, code: "DST15", name: "Puttalam", province_id: 5 },
    { id:16, code: "DST16", name: "Kegalle", province_id: 6 },
];

export const divisionalSecretariats = [
    { id:1, code:"DS0001", name:"Akurana", district_id:1 },
    { id:2, code:"DS0002", name:"Kandy", district_id:1 },
    { id:3, code:"DS0015", name:"Pothuvil", district_id:4},
    { id:4, code:"DS0018", name:"Manmunai North", district_id:5 },
];

export const gramaNiladharis = [
    { id:1, code:"GN000001", name:"gn1", divisional_secretariat_id:1 },
    { id:2, code:"GN000002", name:"gn2", divisional_secretariat_id:2 },
    { id:3, code:"GN000023", name:"gn5", divisional_secretariat_id:3 },
];

