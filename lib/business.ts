const addressDetails = {
  premises: "ASR 026, Ground Floor, Astra Towers",
  locality: "Newtown",
  area: "Action Area IIC",
  city: "Kolkata",
  postalCode: "700161",
  region: "West Bengal",
  country: "India",
  countryCode: "IN",
} as const;
const addressLines = [
  addressDetails.premises,
  `${addressDetails.locality}, ${addressDetails.area}`,
  `${addressDetails.city} - ${addressDetails.postalCode}`,
  `${addressDetails.region}, ${addressDetails.country}`,
] as const;
const locationLabel = `${addressDetails.locality}, ${addressDetails.city}`;
const whatsappNumber = "918981441040";
const primaryPhone = {
  display: "+91 89814 41040",
  href: "tel:+918981441040",
} as const;

export const business = {
  brandName: "Regalien",
  wordmarkDescriptor: "Infrastructure",
  legalCompanyName: "Regalien Infrastructure Pvt. Ltd.",
  industry: "Interior design and infrastructure",
  locationLabel,
  locationFull: `${locationLabel}, ${addressDetails.region}, ${addressDetails.country}`,
  phones: {
    primary: primaryPhone,
    secondary: {
      display: "+91 98319 91040",
      href: "tel:+919831991040",
    },
  },
  whatsapp: {
    display: primaryPhone.display,
    number: whatsappNumber,
    url: `https://wa.me/${whatsappNumber}`,
  },
  addressLines,
  fullAddress: addressLines.join(", "),
  addressDetails: {
    streetAddress: `${addressDetails.premises}, ${addressDetails.locality}, ${addressDetails.area}`,
    addressLocality: addressDetails.city,
    addressRegion: addressDetails.region,
    postalCode: addressDetails.postalCode,
    addressCountry: addressDetails.countryCode,
  },
  googleMapsUrl: "https://maps.app.goo.gl/1hzEZGmSfmzfCoAq7?g_st=aw",
  websiteUrl: "https://regalien.in/",
  socialProfiles: {
    instagram: {
      label: "Instagram",
      url: "https://www.instagram.com/regalieninteriors",
    },
    facebook: {
      label: "Facebook",
      url: "https://www.facebook.com/share/1CWYE9opuw/",
    },
    youtube: {
      label: "YouTube",
      url: "https://youtube.com/@regalieninterior",
    },
  },
} as const;
