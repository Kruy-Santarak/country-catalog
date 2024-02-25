export default class CountryDTO {
  constructor(
    officialName = "",
    alternativeName = "",
    nativeName = "",
    flag = "",
    idd,
    twoDigitsCode = "",
    threeDigitCode = "",
    capital = "",
    area = 0,
    googleMap = ""
  ) {
    this.officialName = officialName || "";
    this.alternativeName = alternativeName || "";
    this.nativeName = nativeName || "";
    this.flag = flag || "";
    this.idd = idd;
    this.twoDigitsCode = twoDigitsCode || "";
    this.threeDigitCode = threeDigitCode || "";
    this.capital = capital || "";
    this.area = area;
    this.googleMap = googleMap || "";
  }
  // get country code
  countryCode() {
    const suffixes = this.idd?.suffixes || [];
    const suffix = suffixes.length === 1 ? suffixes[0] : "";
    return `${this.idd?.root}${suffix.length > 2 ? "-" : ""}${suffix}`; // +855, +1-684
  }
  // iso code
  isoCode() {
    return `${this.twoDigitsCode}/${this.threeDigitCode}`.toUpperCase();
  }
}
