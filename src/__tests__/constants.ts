
export const addressValidationRules = {
    "rules": {
        "postcode": {
            "dependsOn": {
                "countryIso": {
                    "GB": {
                        "rules": {
                            "required": true,
                            "minlength": "5",
                            "maxlength": "8",
                            "pattern": "^([a-zA-Z]{2}\\d[a-zA-Z0-9]?|[a-zA-Z]\\d[a-zA-Z0-9]?) [0-9][a-zA-Z]{2}$"
                        },
                        "messages": {
                            "required": "Please enter a valid UK postcode with a space",
                            "minlength": "Please enter a valid UK postcode with a space",
                            "maxlength": "Please enter a valid UK postcode with a space",
                            "pattern": "Please enter a valid UK postcode with a space"
                        }
                    },
                    "IM": {
                        "rules": {
                            "required": true,
                            "minlength": "5",
                            "maxlength": "8",
                            "pattern": "^([a-zA-Z]{2}\\d[a-zA-Z0-9]?|[a-zA-Z]\\d[a-zA-Z0-9]?) [0-9][a-zA-Z]{2}$"
                        },
                        "messages": {
                            "required": "Please enter a valid UK postcode with a space",
                            "minlength": "Please enter a valid UK postcode with a space",
                            "maxlength": "Please enter a valid UK postcode with a space",
                            "pattern": "Please enter a valid UK postcode with a space"
                        }
                    },
                    "DE": {
                        "rules": {
                            "required": true,
                            "minlength": "5",
                            "maxlength": "5",
                            "pattern": "^[0-9]{5}$"
                        },
                        "messages": {
                            "required": "Bitte geben Sie eine gültige deutsche Postleitzahl ein.",
                            "minlength": "Bitte geben Sie eine gültige deutsche Postleitzahl ein.",
                            "maxlength": "Bitte geben Sie eine gültige deutsche Postleitzahl ein.",
                            "pattern": "Bitte geben Sie eine gültige deutsche Postleitzahl ein."
                        }
                    },
                    "US": {
                        "rules": {
                            "required": true,
                            "minlength": "5",
                            "maxlength": "5",
                            "pattern": "^\\d{5}$"
                        },
                        "messages": {
                            "required": "Please enter a valid US zip code",
                            "minlength": "Please enter a valid US zip code",
                            "maxlength": "Please enter a valid US zip code",
                            "pattern": "Please enter a valid US zip code"
                        }
                    },
                    "DEFAULT": {
                        "rules": {
                            "required": false,
                            "maxlength": "15"
                        },
                        "messages": {
                            "maxlength": "Please enter a valid UK postcode with a space"
                        }
                    }
                }
            },
            "marketpattern": "^((?![j, J][e, E])(?![g, G][y, Y])).+"
        },
        "formattedAddress": {
            "required": false,
            "minlength": 0,
            "maxlength": 150,
            "pattern": "^[\\p{L}\\d\\?]{1}[\\p{L}\\d ,/:@'&\\?\\-\\.\\(\\)\\!\\+]*$|^$"
        },
        "placeId": {
            "required": false
        },
        "lng": {
            "required": false
        },
        "lat": {
            "required": false
        },
        "regionIso": {
            "required": true
        },
        "cellPhone": {
            "pattern": "^[0-9]{7,12}$",
            "required": true
        },
        "addressName": {
            "minlength": 0,
            "maxlength": 30,
            "pattern": "^[\\p{L}\\d ',\\?\\.\\(\\)\\-]*$",
            "pattern2": "^[\\p{Latin}\\d ',\\?\\.\\(\\)\\-]*$"
        },
        "titleCode": {
            "required": true
        },
        "firstName": {
            "required": true,
            "minlength": 1,
            "maxlength": 30,
            "pattern": "^[\\p{L}\\d ',\\?\\.\\(\\)\\-]*$",
            "pattern2": "^[\\p{Latin}\\d ',\\?\\.\\(\\)\\-]*$"
        },
        "lastName": {
            "required": true,
            "minlength": 1,
            "maxlength": 30,
            "pattern": "^[\\p{L}\\d ',\\?\\.\\(\\)\\-]*$",
            "pattern2": "^[\\p{Latin}\\d ',\\?\\.\\(\\)\\-]*$"
        },
        "line1": {
            "required": true,
            "minlength": 1,
            "maxlength": 35,
            "pattern": "^[\\p{L}\\d\\?]{1}[\\p{L}\\d ,/:@'&\\?\\-\\.\\(\\)\\!\\+]*$|^$",
            "pattern2": "^[\\p{Latin}\\d ,/:@'&\\?\\-\\.\\(\\)\\!\\+]*$"
        },
        "line2": {
            "minlength": 0,
            "maxlength": 35,
            "pattern": "^[\\p{L}\\d\\?]{1}[\\p{L}\\d ,/:@'&\\?\\-\\.\\(\\)\\!\\+]*$|^$",
            "pattern2": "^[\\p{Latin}\\d ,/:@'&\\?\\-\\.\\(\\)\\!\\+]*$"
        },
        "line3": {
            "minlength": 0,
            "maxlength": 35,
            "pattern": "^[\\p{L}\\d\\?]{1}[\\p{L}\\d ,/:@'&\\?\\-\\.\\(\\)\\!\\+]*$|^$",
            "pattern2": "^[\\p{Latin}\\d ,/:@'&\\?\\-\\.\\(\\)\\!\\+]*$"
        },
        "townCity": {
            "required": true,
            "minlength": 1,
            "maxlength": 30,
            "pattern": "^[\\p{L}\\d\\?]{1}[\\p{L}\\d ,/:@'&\\?\\-\\.\\(\\)\\!\\+]*$|^$",
            "pattern2": "^[\\p{Latin}\\d ,/:@'&\\?\\-\\.\\(\\)\\!\\+]*$"
        },
        "countryIso": {
            "required": true
        },
        "mobileCountryCode": {
            "required": true
        },
        "companyName": {
            "minlength": 0,
            "maxlength": 30,
            "pattern": "^[\\p{L}\\d\\?]{1}[\\p{L}\\d ,/:@'&\\?\\-\\.\\(\\)\\!\\+]*$|^$",
            "pattern2": "^[\\p{Latin}\\d ,/:@'&\\?\\-\\.\\(\\)\\!\\+]*$"
        }
    },
    "messages": {
        "postcode": {
            "dependsOn": "Please enter a valid {0} postcode",
            "marketpattern": "Unfortunately we do not deliver to your destination; please enter a new address"
        },
        "formattedAddress": {
            "required": "Please provide formatted Address",
            "minlength": "address.formattedAddress.invalid",
            "maxlength": "address.formattedAddress.invalid",
            "pattern": "address.formattedAddress.invalid"
        },
        "placeId": {
            "required": "Please provide place id"
        },
        "lng": {
            "required": "Please provide a valid longitude"
        },
        "lat": {
            "required": "Please provide a valid latitude"
        },
        "regionIso": {
            "required": "Please select state"
        },
        "cellPhone": {
            "pattern": "Please enter a valid number without spaces",
            "required": "Please enter a valid number without spaces"
        },
        "addressName": {
            "minlength": "Please enter fewer than 30 characters",
            "maxlength": "Please enter fewer than 30 characters",
            "pattern": "Please enter a label that contains only letters, numbers and allowed punctuation characters.",
            "pattern2": "Please enter a label that contains only letters, numbers and allowed punctuation characters."
        },
        "titleCode": {
            "required": "Please select a title"
        },
        "firstName": {
            "required": "Please enter a first name",
            "minlength": "Please enter a first name",
            "maxlength": "Please enter a first name",
            "pattern": "Please enter a first name that contains only letters, numbers and allowed punctuation",
            "pattern2": "Please enter a first name that contains only letters, numbers and allowed punctuation"
        },
        "lastName": {
            "required": "Please enter a last name",
            "minlength": "Please enter a last name",
            "maxlength": "Please enter a last name",
            "pattern": "Please enter a last name that contains only letters, numbers and allowed punctuation",
            "pattern2": "Please enter a last name that contains only letters, numbers and allowed punctuation"
        },
        "line1": {
            "required": "Please enter the first line of your address",
            "minlength": "Please enter the first line of your address",
            "maxlength": "Please enter the first line of your address",
            "pattern": "Please enter an address that contains only letters, numbers and punctuation",
            "pattern2": "Please enter an address that contains only letters, numbers and punctuation"
        },
        "line2": {
            "minlength": "Please add the second line of your address",
            "maxlength": "Please add the second line of your address",
            "pattern": "Please enter an address that contains only letters, numbers and punctuation",
            "pattern2": "Please enter an address that contains only letters, numbers and punctuation"
        },
        "line3": {
            "minlength": "Please enter the third line of your address",
            "maxlength": "Please enter the third line of your address",
            "pattern": "Please enter an address that contains only letters, numbers and punctuation",
            "pattern2": "Please enter an address that contains only letters, numbers and punctuation"
        },
        "townCity": {
            "required": "Please enter a town or city",
            "minlength": "Please enter a town or city",
            "maxlength": "Please enter a town or city",
            "pattern": "Please enter a town or city that contains only letters and punctuation",
            "pattern2": "Please enter a town or city that contains only letters and punctuation"
        },
        "countryIso": {
            "required": "Please select a country"
        },
        "mobileCountryCode": {
            "required": "Please select your country code"
        },
        "companyName": {
            "minlength": "Please enter a company name",
            "maxlength": "Please enter a company name",
            "pattern": "Please enter a company name that contains only letters, numbers and allowed punctuation",
            "pattern2": "Please enter a company name that contains only letters, numbers and allowed punctuation"
        }
    }
};
