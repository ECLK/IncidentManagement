const createInstitution = (id, code, sn_name, tm_name, name, type) => {
    return {id, code, sn_name, tm_name, name, type}
}

export var institutions = [
    createInstitution(1, "M01", "ආරක්ෂක අමාත්‍යංශය", "பாதுகாப்பு அமைச்சகம்", "Ministry of Defense", "Ministry"),
    createInstitution(2, "M02", "මුදල් ආර්ථික සහ ප්‍රතිපත්ති සංවර්ධන අමාත්‍යාංශය", "நிதி பொருளாதாரம் மற்றும் கொள்கை அபிவிருத்தி அமைச்சு", "Ministry of Finance Economic and Policy Development", "Ministry"),
    createInstitution(3, "M03", "බුද්ධශාසන සංස්කෘතික හා ආගමික කටයුතු අමාත්‍යංශය", "புத்தசாசனஇ கலாசார மற்றும் சமய அலுவல்கள் அமைச்சர", "Ministry of Buddha Sasana Cultural and Religious Affairs", "Ministry"),
    createInstitution(4, "M04", "නාගරික සංවර්ධන ජල සම්පාදන නිවාස පහසුකම්", "நகர அபிவிருத்தி நீர்வழங்கல் மற்றும் வீடமைப்பு வசதிகள் அமைச்சு", "Ministry of Urban Development Water Supply and Housing Facilities", "Ministry"),
    createInstitution(5, "M05", "අධිකරණ මානව හිමිකම් හා නීති ප්‍රතිසංස්කරණ අමාත්‍යාංශය", "நீதி மனித உரிமைகள் மற்றும் சட்ட மறுசீரமைப்பு அமைச்சு", "Ministry of Justice Human Rights & Legal Reforms", "Ministry"),
]