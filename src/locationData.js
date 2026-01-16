import { chattisgarhHospitals } from "./HospitalDataLists/chattisgarh";
import { haryanaHospitals } from "./HospitalDataLists/haryana";
import { karnatakaHospitals } from "./HospitalDataLists/karnatka";
import { maharashtraHospitals } from "./HospitalDataLists/maharashtra";
import { nationalCapitalRegionHospitals } from "./HospitalDataLists/nationalCapitalRegion";
import { punjabHospitals } from "./HospitalDataLists/punjab";
import { rajasthanHospitals } from "./HospitalDataLists/rajasthan";
import { tamilNaduHospitals } from "./HospitalDataLists/tamilNadu";
import { telanganaHospitals } from "./HospitalDataLists/telangana";
import { uttarPradeshHospitals } from "./HospitalDataLists/uttarPradesh";
import { westBangalHospitals } from "./HospitalDataLists/westBangal";

export const locations = [
  maharashtraHospitals || {},
  rajasthanHospitals || {},
  karnatakaHospitals || {},
  nationalCapitalRegionHospitals || {},
  westBangalHospitals || {},
  punjabHospitals || {},
  chattisgarhHospitals || {},
  telanganaHospitals || {},
  tamilNaduHospitals || {},
  uttarPradeshHospitals || {},
  haryanaHospitals || {},
];
