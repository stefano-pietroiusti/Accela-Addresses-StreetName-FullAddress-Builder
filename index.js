var streetSuffixes = new Array();
streetSuffixes.push("ROAD")
streetSuffixes.push("TERRACE")
streetSuffixes.push("CRESCENT")

var result = buildStreetDetail("Chaucer Road North");
console.log("result: " + JSON.stringify(result))

result = buildFullAddress("houseNo", "houseSuffix", "unit", "streetName", "streetSuffix", "streetSuffixDirection", "neighbourhood", "city", "postCode");
console.log("buildFullAddress: " + result)

function isEmptyString(str) {
  return str == null || str === '' || str === undefined || str === 'null' || str === 'undefined';
}

function buildStreetDetail(sStreet) {
  var gsAccelaStreetSuffix = streetSuffixes;
  var result = {
    "fullName": "",
    "street": "",
    "typeAbbr": "",
    "suffix": "",
    "prefix": "",
    "suffixDirection": ""
  }
  var sParts = new Array();
  var iParts;
  var iCnt;
  var iNPart;
  sParts = sStreet.split(/[\s,.:\t]/)
  iParts = sParts.length;
  result.fullName = sStreet;
  switch (sParts[iParts - 1].trim().toUpperCase()) {
    case "NORTH":
      result.suffixDirection = "NORTH";
      result.typeFull = "";
      iParts = (iParts - 1);
      break;
    case "SOUTH":
      result.suffixDirection = "SOUTH";
      result.typeFull = "";
      iParts = (iParts - 1);
      break;
    case "EAST":
      result.suffixDirection = "EAST";
      result.typeFull = "";
      iParts = (iParts - 1);
      break;
    case "WEST":
      result.suffixDirection = "WEST";
      result.typeFull = "";
      iParts = (iParts - 1);
      break;
  }
  //  Find Street Type
  for (iCnt = 1; (iCnt <= iParts); iCnt++) {
    for (sf = 0; sf < gsAccelaStreetSuffix.length; sf++) {
      if (!isEmptyString(gsAccelaStreetSuffix[sf]) && !isEmptyString(sParts[iCnt]) &&
        gsAccelaStreetSuffix[sf].trim().toUpperCase() === sParts[iCnt].trim().toUpperCase()) {
        iNPart = (iCnt - 1);
        result.suffix = sParts[iCnt].trim().toUpperCase();
        break;
      }
    }
  }
  //  Build Road Name
  result.street = "";
  for (iCnt = 0; (iCnt <= iNPart); iCnt++) {
    if (sParts[iCnt])
      result.street = (result.street + (" " + sParts[iCnt])).trim().toUpperCase();
  }
  //  Deal With 'The'
  if ((sParts[0].toUpperCase() == "THE" || sParts[0].toUpperCase() == "TBC")) {
    if (sParts[1])
      result.street = (sParts[0] + " " + sParts[1]).trim().toUpperCase();
    else
      result.street = sParts[0].trim().toUpperCase();
    result.typeAbbr = "";
    result.typeFull = "";
  }
  //  Build Full Name
  if ((result.fullName == "")) {
    result.fullName = (result.street + " " + result.typeFull + " " + result.suffix).trim().toUpperCase();
  }
  return result;
}

function buildFullAddress(houseNo, houseSuffix, unit, streetName, streetSuffix, streetSuffixDirection, neighbourhood, city, postCode) {
  var result = "";
  if (!isEmptyString(unit))
    result += unit + " / ";
  if (!isEmptyString(houseNo))
    result += houseNo;
  if (!isEmptyString(houseSuffix))
    result += houseSuffix;
  if (!isEmptyString(streetName))
    result += " " + streetName;
  if (!isEmptyString(streetSuffix))
    result += " " + streetSuffix;
  if (!isEmptyString(streetSuffixDirection))
    result += " " + streetSuffixDirection;
  if (!isEmptyString(neighbourhood))
    result += ", " + neighbourhood;
  if (!isEmptyString(city))
    result += ", " + city;
  if (!isEmptyString(postCode))
    result += " " + postCode;
  return result.toUpperCase();
}
