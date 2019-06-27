import moment from "moment";

export var incidents = [
  {
    id: "9ba6c369-ee8c-49ca-9bab-ac50dc678570",
    refId: "1045",
    title: "Attacking Polling Stations",
    description:
      "Nulla laborum voluptate laboris incididunt. Laborum elit excepteur labore anim quis eu amet eiusmod velit esse. In ex cupidatat laborum id aliquip nisi sit non voluptate. Nisi dolor incididunt veniam ipsum. Ad quis cupidatat sit aute laborum excepteur cillum do officia. Proident reprehenderit ut dolor qui fugiat. Sint consectetur magna aute proident ex id adipisicing aute aute officia et nostrud",
    occurrence: "OCCURED",
    election: "Provincial Election 2019",
    polling_station: "Kirulapone Temple",
    ds_division: "Colombo",
    category: "Violence",
    subCategory: "Mob Attack Station",
    infoChannel: "Social Media",
    createdDate: moment(new Date())
      .subtract(4, "hour")
      .toDate(),
    reporterId: 1,
    status: "NEW",
    severity: "MAJOR",
    responseTimeInHours: 1,
    assignees: [],
    locationName: "Colombo",
    hasPendingStatusChange: false
  },
  {
    id: "ed4fb628-618c-4ff8-94b3-906336354bec",
    refId: "1200",
    title: "Illegal Picketing event",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    occurrence: "OCCURRING",
    election: "Presedential Election 2020",
    polling_station: "Matara College",
    ds_division: "Matara",
    category: "Violence",
    subCategory: "Misuse of public property",
    infoChannel: "Call Center",
    createdDate: moment(new Date())
      .subtract(3, "hour")
      .toDate(),
    reporterId: 1,
    status: "NEW",
    severity: "DEFAULT",
    responseTimeInHours: 2,
    locationName: "Matara",
    hasPendingStatusChange: false,
    assignees: []
  },
  {
    id: "41071ede-bad9-4933-a037-b140b86cf0e4",
    refId: "1202",
    title: "Threatening Voters",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem",
    occurrence: "WILL_OCCUR",
    election: "Parliment Election 2020",
    polling_station: "Hiripitiya Temple",
    ds_division: "Homagama",
    category: "Violence",
    subCategory: "Threat",
    infoChannel: "Police",
    createdDate: moment(new Date())
      .subtract(1, "hour")
      .toDate(),
    reporterId: 2,
    status: "REQUEST_MORE_INFO",
    severity: "DEFAULT",
    responseTimeInHours: 3,
    locationName: "Jaffna",
    hasPendingStatusChange: false,
    assignees: []
  },
  {
    id: "08e83c67-4f97-40b7-8df9-9551ec79e39715",
    refId: "1250",
    title: "Misusing ministry vehicles",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
    occurrence: "OCCURED",
    election: "Parliment Election 2020",
    polling_station: "Mahalwarawa Temple",
    ds_division: "Kesbewa",
    category: "Misuse",
    subCategory: "Misuse of Public Property",
    infoChannel: "Police",
    createdDate: moment(new Date())
      .subtract(2, "hour")
      .toDate(),
    reporterId: 4,
    status: "NEW",
    severity: "DEFAULT",
    responseTimeInHours: 24,
    locationName: "Badulla",
    hasPendingStatusChange: false,
    assignees: []
  },
  {
    id: "d200f322-b297-4014-bff7-2b12ebb110454",
    refId: "1262",
    title: "Illegal Cutout",
    description:
      "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.",
    occurrence: "OCCURRING",
    election: "Presedential Election 2020",
    polling_station: "Imaduwa School",
    ds_division: "Imaduwa",
    category: "Misuse",
    subCategory: "Posters/Cutouts",
    infoChannel: "Social Media",
    createdDate: moment(new Date())
      .subtract(5, "hour")
      .toDate(),
    reporterId: 3,
    status: "NEW",
    severity: "DEFAULT",
    responseTimeInHours: 1,
    locationName: "Colombo",
    hasPendingStatusChange: false,
    assignees: []
  },
  {
    id: "d200f322-b297-4014-bff7-2b12ebb110453",
    refId: "1262",
    title: "Illegal Cutout",
    description:
      "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.",
    occurrence: "OCCURRING",
    election: "Presedential Election 2020",
    polling_station: "Imaduwa School",
    ds_division: "Imaduwa",
    category: "Misuse",
    subCategory: "Posters/Cutouts",
    infoChannel: "Social Media",
    createdDate: moment(new Date())
      .subtract(1, "day")
      .toDate(),
    reporterId: 3,
    status: "NEW",
    severity: "DEFAULT",
    responseTimeInHours: 24,
    locationName: "Colombo",
    hasPendingStatusChange: false,
    assignees: []
  },
  {
    id: "d200f322-b297-4014-bff7-2b12ebb110452",
    refId: "1262",
    title: "Illegal Cutout",
    description:
      "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.",
    occurrence: "OCCURRING",
    election: "Presedential Election 2020",
    polling_station: "Imaduwa School",
    ds_division: "Imaduwa",
    category: "Misuse",
    subCategory: "Posters/Cutouts",
    infoChannel: "Social Media",
    createdDate: moment(new Date())
      .subtract(2, "day")
      .toDate(),
    reporterId: 3,
    status: "NEW",
    severity: "DEFAULT",
    responseTimeInHours: 24,
    locationName: "Colombo",
    hasPendingStatusChange: false,
    assignees: []
  },
  {
    id: "d200f322-b297-4014-bff7-2b12ebb110451",
    refId: "1262",
    title: "Illegal Cutout",
    description:
      "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.",
    occurrence: "OCCURRING",
    election: "Presedential Election 2020",
    polling_station: "Imaduwa School",
    ds_division: "Imaduwa",
    category: "Misuse",
    subCategory: "Misuse of public property",
    infoChannel: "Social Media",
    createdDate: moment(new Date())
      .subtract(3, "day")
      .toDate(),
    reporterId: 24,
    status: "NEW",
    severity: "DEFAULT",
    responseTimeInHours: 24,
    locationName: "Colombo",
    hasPendingStatusChange: false,
    assignees: []
  }
];
