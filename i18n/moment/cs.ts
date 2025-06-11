import type {LocaleSpecification} from "moment";

export const czechMomentSpecification: LocaleSpecification = {
    months: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
    monthsShort: ['led.', 'úno.', 'bře.', 'dub.', 'kvě.', 'čer.', 'čvc.', 'srp.', 'zář.', 'říj.', 'lis.', 'pro.'],
    monthsParseExact: true,
    weekdays: ['pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota', 'neděle'],
    weekdaysShort: ['po', 'út', 'st', 'čt', 'pá', 'so', 'ne'],
    weekdaysMin: ['po', 'út', 'st', 'čt', 'pá', 'so', 'ne'],
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY HH:mm',
        LLLL: 'dddd D. MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[dnes v] LT',
        nextDay: '[zítra v] LT',
        nextWeek: 'dddd [v] LT',
        lastDay: '[včera v] LT',
        lastWeek: '[minulý] dddd [v] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'za %s',
        past: 'před %s',
        s: 'pár sekund',
        m: 'minuta',
        mm: '%d minut',
        h: 'hodina',
        hh: '%d hodin',
        d: 'den',
        dd: '%d dní',
        M: 'měsíc',
        MM: '%d měsíců',
        y: 'rok',
        yy: '%d let'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: function (number) {
        return number + '.';
    },
    meridiemParse: /PD|MD/,
    isPM: function (input) {
        return input === 'MD';
    },
    meridiem: function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD'; // PD = dopoledne, MD = odpoledne
    },
    week: {
        dow: 1, // pondělí
        doy: 4  // první týden musí obsahovat 4. leden
    }
}