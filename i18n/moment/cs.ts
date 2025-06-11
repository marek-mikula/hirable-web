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
        s: function (_, __, ___, isFuture) {
            return isFuture ? 'pár sekund' : 'pár sekundami';
        },
        m: function (_, __, ___, isFuture) {
            return isFuture ? 'minutu' : 'minutou';
        },
        mm: function (num: number, _, __, isFuture: boolean) {
            if (isFuture) {
                if (num === 1) return 'minutu';
                if (num >= 2 && num <= 4) return num + ' minuty';
                return num + ' minut';
            } else {
                if (num === 1) return 'minutou';
                if (num >= 2 && num <= 4) return num + ' minutami';
                return num + ' minutami';
            }
        },
        h: function (_, __, ___, isFuture) {
            return isFuture ? 'hodinu' : 'hodinou';
        },
        hh: function (num: number, _, __, isFuture: boolean) {
            if (isFuture) {
                if (num === 1) return 'hodinu';
                if (num >= 2 && num <= 4) return num + ' hodiny';
                return num + ' hodin';
            } else {
                if (num === 1) return 'hodinou';
                if (num >= 2 && num <= 4) return num + ' hodinami';
                return num + ' hodinami';
            }
        },
        d: function (_, __, ___, isFuture) {
            return isFuture ? 'den' : 'dnem';
        },
        dd: function (num: number, _, __, isFuture: boolean) {
            if (isFuture) {
                if (num === 1) return 'den';
                return num + ' dní';
            } else {
                if (num === 1) return 'dnem';
                return num + ' dny';
            }
        },
        M: function (_, __, ___, isFuture) {
            return isFuture ? 'měsíc' : 'měsícem';
        },
        MM: function (num: number, _, __, isFuture: boolean) {
            if (isFuture) {
                if (num === 1) return 'měsíc';
                if (num >= 2 && num <= 4) return num + ' měsíce';
                return num + ' měsíců';
            } else {
                if (num === 1) return 'měsícem';
                if (num >= 2 && num <= 4) return num + ' měsíci';
                return num + ' měsíci';
            }
        },
        y: function (_, __, ___, isFuture) {
            return isFuture ? 'rok' : 'rokem';
        },
        yy: function (num: number, _, __, isFuture: boolean) {
            if (isFuture) {
                if (num === 1) return 'rok';
                if (num >= 2 && num <= 4) return num + ' roky';
                return num + ' let';
            } else {
                if (num === 1) return 'rokem';
                if (num >= 2 && num <= 4) return num + ' roky';
                return num + ' lety';
            }
        }
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