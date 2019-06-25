import handler from "./apiHandler";

export const getCatogories = () => {
  return handler.get("/categories");
};

export const postIncidentReport = incidentData => {
  return handler.post("/incident", incidentData);
};

export const getInitialIncidents = () => {
  return Promise.resolve({
    data: [
      {
        id: 1,
        title: "Posters being put up",
        description: " decription decription decription decription ",
        status: "New",
        category: "Violation",
        location: "Gampaha"
      },
      {
        id: 2,
        title: "Thugs set fire to shop",
        description: " decription decription decription decription ",
        status: "New",
        category: "Violation",
        location: "Gampaha"
      },
      {
        id: 3,
        title: "Threatned by a thug",
        description: " decription decription decription decription ",
        status: "New",
        category: "Violation",
        location: "Gampaha"
      },
      {
        id: 4,
        title: "Stolen ballot box",
        description: " decription decription decription decription ",
        status: "New",
        category: "Violation",
        location: "Gampaha"
      },
      {
        id: 5,
        title: "Fire at ballot station",
        description: " decription decription decription decription ",
        status: "New",
        category: "Violation",
        location: "Gampaha"
      },
      {
        id: 6,
        title: "Shooting at ballot station",
        description: " decription decription decription decription ",
        status: "New",
        category: "Violation",
        location: "Gampaha"
      }
    ]
  });
};
