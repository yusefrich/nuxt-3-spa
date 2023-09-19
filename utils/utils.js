import dayjs from 'dayjs'
const utils = {
  // todo refactor utils to impruve quality of code
  /* eslint-disable */
  formattedDate (date) {
    return dayjs(date).format('DD/MM/YYYY')
  },
  listOfCountries () {
    return [ 
      {label: 'Afghanistan', value: 'af'},
      {label: 'Åland Islands', value: 'ax'},
      {label: 'Albania', value: 'al'},
      {label: 'Algeria', value: 'dz'},
      {label: 'American Samoa', value: 'as'},
      {label: 'AndorrA', value: 'ad'},
      {label: 'Angola', value: 'ao'},
      {label: 'Anguilla', value: 'ai'},
      {label: 'Antarctica', value: 'aq'},
      {label: 'Antigua and Barbuda', value: 'ag'},
      {label: 'Argentina', value: 'ar'},
      {label: 'Armenia', value: 'am'},
      {label: 'Aruba', value: 'aw'},
      {label: 'Australia', value: 'au'},
      {label: 'Austria', value: 'at'},
      {label: 'Azerbaijan', value: 'az'},
      {label: 'Bahamas', value: 'bs'},
      {label: 'Bahrain', value: 'bh'},
      {label: 'Bangladesh', value: 'bd'},
      {label: 'Barbados', value: 'bb'},
      {label: 'Belarus', value: 'by'},
      {label: 'Belgium', value: 'be'},
      {label: 'Belize', value: 'bz'},
      {label: 'Benin', value: 'bj'},
      {label: 'Bermuda', value: 'bm'},
      {label: 'Bhutan', value: 'bt'},
      {label: 'Bolivia', value: 'bo'},
      {label: 'Bosnia and Herzegovina', value: 'ba'},
      {label: 'Botswana', value: 'bw'},
      {label: 'Bouvet Island', value: 'bv'},
      {label: 'Brazil', value: 'br'},
      {label: 'British Indian Ocean Territory', value: 'io'},
      {label: 'Brunei Darussalam', value: 'bn'},
      {label: 'Bulgaria', value: 'bg'},
      {label: 'Burkina Faso', value: 'bf'},
      {label: 'Burundi', value: 'bi'},
      {label: 'Cambodia', value: 'kh'},
      {label: 'Cameroon', value: 'cm'},
      {label: 'Canada', value: 'ca'},
      {label: 'Cape Verde', value: 'cv'},
      {label: 'Cayman Islands', value: 'ky'},
      {label: 'Central African Republic', value: 'cf'},
      {label: 'Chad', value: 'td'},
      {label: 'Chile', value: 'cl'},
      {label: 'China', value: 'cn'},
      {label: 'Christmas Island', value: 'cx'},
      {label: 'Cocos (Keeling) Islands', value: 'cc'},
      {label: 'Colombia', value: 'co'},
      {label: 'Comoros', value: 'km'},
      {label: 'Congo', value: 'cg'},
      {label: 'Congo, The Democratic Republic of the', value: 'cd'},
      {label: 'Cook Islands', value: 'ck'},
      {label: 'Costa Rica', value: 'cr'},
      {label: 'Cote D\'Ivoire', value: 'ci'},
      {label: 'Croatia', value: 'hr'},
      {label: 'Cuba', value: 'cu'},
      {label: 'Cyprus', value: 'cy'},
      {label: 'Czech Republic', value: 'cz'},
      {label: 'Denmark', value: 'dk'},
      {label: 'Djibouti', value: 'dj'},
      {label: 'Dominica', value: 'dm'},
      {label: 'Dominican Republic', value: 'do'},
      {label: 'Ecuador', value: 'ec'},
      {label: 'Egypt', value: 'eg'},
      {label: 'El Salvador', value: 'sv'},
      {label: 'Equatorial Guinea', value: 'gq'},
      {label: 'Eritrea', value: 'er'},
      {label: 'Estonia', value: 'ee'},
      {label: 'Ethiopia', value: 'et'},
      {label: 'Falkland Islands (Malvinas)', value: 'fk'},
      {label: 'Faroe Islands', value: 'fo'},
      {label: 'Fiji', value: 'fj'},
      {label: 'Finland', value: 'fi'},
      {label: 'France', value: 'fr'},
      {label: 'French Guiana', value: 'gf'},
      {label: 'French Polynesia', value: 'pf'},
      {label: 'French Southern Territories', value: 'tf'},
      {label: 'Gabon', value: 'ga'},
      {label: 'Gambia', value: 'gm'},
      {label: 'Georgia', value: 'ge'},
      {label: 'Germany', value: 'de'},
      {label: 'Ghana', value: 'gh'},
      {label: 'Gibraltar', value: 'gi'},
      {label: 'Greece', value: 'gr'},
      {label: 'Greenland', value: 'gl'},
      {label: 'Grenada', value: 'gd'},
      {label: 'Guadeloupe', value: 'gp'},
      {label: 'Guam', value: 'gu'},
      {label: 'Guatemala', value: 'gt'},
      {label: 'Guernsey', value: 'gg'},
      {label: 'Guinea', value: 'gn'},
      {label: 'Guinea-Bissau', value: 'gw'},
      {label: 'Guyana', value: 'gy'},
      {label: 'Haiti', value: 'ht'},
      {label: 'Heard Island and Mcdonald Islands', value: 'hm'},
      {label: 'Holy See (Vatican City State)', value: 'va'},
      {label: 'Honduras', value: 'hn'},
      {label: 'Hong Kong', value: 'hk'},
      {label: 'Hungary', value: 'hu'},
      {label: 'Iceland', value: 'is'},
      {label: 'India', value: 'in'},
      {label: 'Indonesia', value: 'id'},
      {label: 'Iran, Islamic Republic Of', value: 'ir'},
      {label: 'Iraq', value: 'iq'},
      {label: 'Ireland', value: 'ie'},
      {label: 'Isle of Man', value: 'im'},
      {label: 'Israel', value: 'il'},
      {label: 'Italy', value: 'it'},
      {label: 'Jamaica', value: 'jm'},
      {label: 'Japan', value: 'jp'},
      {label: 'Jersey', value: 'je'},
      {label: 'Jordan', value: 'jo'},
      {label: 'Kazakhstan', value: 'kz'},
      {label: 'Kenya', value: 'ke'},
      {label: 'Kiribati', value: 'ki'},
      {label: 'Korea, Democratic People\'S Republic of', value: 'kp'},
      {label: 'Korea, Republic of', value: 'kr'},
      {label: 'Kuwait', value: 'kw'},
      {label: 'Kyrgyzstan', value: 'kg'},
      {label: 'Lao People\'S Democratic Republic', value: 'la'},
      {label: 'Latvia', value: 'lv'},
      {label: 'Lebanon', value: 'lb'},
      {label: 'Lesotho', value: 'ls'},
      {label: 'Liberia', value: 'lr'},
      {label: 'Libyan Arab Jamahiriya', value: 'ly'},
      {label: 'Liechtenstein', value: 'li'},
      {label: 'Lithuania', value: 'lt'},
      {label: 'Luxembourg', value: 'lu'},
      {label: 'Macao', value: 'mo'},
      {label: 'Macedonia, The Former Yugoslav Republic of', value: 'mk'},
      {label: 'Madagascar', value: 'mg'},
      {label: 'Malawi', value: 'mw'},
      {label: 'Malaysia', value: 'my'},
      {label: 'Maldives', value: 'mv'},
      {label: 'Mali', value: 'ml'},
      {label: 'Malta', value: 'mt'},
      {label: 'Marshall Islands', value: 'mh'},
      {label: 'Martinique', value: 'mq'},
      {label: 'Mauritania', value: 'mr'},
      {label: 'Mauritius', value: 'mu'},
      {label: 'Mayotte', value: 'yt'},
      {label: 'Mexico', value: 'mx'},
      {label: 'Micronesia, Federated States of', value: 'fm'},
      {label: 'Moldova, Republic of', value: 'md'},
      {label: 'Monaco', value: 'mc'},
      {label: 'Mongolia', value: 'mn'},
      {label: 'Montserrat', value: 'ms'},
      {label: 'Morocco', value: 'ma'},
      {label: 'Mozambique', value: 'mz'},
      {label: 'Myanmar', value: 'mm'},
      {label: 'Namibia', value: 'na'},
      {label: 'Nauru', value: 'nr'},
      {label: 'Nepal', value: 'np'},
      {label: 'Netherlands', value: 'nl'},
      {label: 'Netherlands Antilles', value: 'an'},
      {label: 'New Caledonia', value: 'nc'},
      {label: 'New Zealand', value: 'nz'},
      {label: 'Nicaragua', value: 'ni'},
      {label: 'Niger', value: 'ne'},
      {label: 'Nigeria', value: 'ng'},
      {label: 'Niue', value: 'nu'},
      {label: 'Norfolk Island', value: 'nf'},
      {label: 'Northern Mariana Islands', value: 'mp'},
      {label: 'Norway', value: 'no'},
      {label: 'Oman', value: 'om'},
      {label: 'Pakistan', value: 'pk'},
      {label: 'Palau', value: 'pw'},
      {label: 'Palestinian Territory, Occupied', value: 'ps'},
      {label: 'Panama', value: 'pa'},
      {label: 'Papua New Guinea', value: 'pg'},
      {label: 'Paraguay', value: 'py'},
      {label: 'Peru', value: 'pe'},
      {label: 'Philippines', value: 'ph'},
      {label: 'Pitcairn', value: 'pn'},
      {label: 'Poland', value: 'pl'},
      {label: 'Portugal', value: 'pt'},
      {label: 'Puerto Rico', value: 'pr'},
      {label: 'Qatar', value: 'qa'},
      {label: 'Reunion', value: 're'},
      {label: 'Romania', value: 'ro'},
      {label: 'Russian Federation', value: 'ru'},
      {label: 'RWANDA', value: 'rw'},
      {label: 'Saint Helena', value: 'sh'},
      {label: 'Saint Kitts and Nevis', value: 'kn'},
      {label: 'Saint Lucia', value: 'lc'},
      {label: 'Saint Pierre and Miquelon', value: 'pm'},
      {label: 'Saint Vincent and the Grenadines', value: 'vc'},
      {label: 'Samoa', value: 'ws'},
      {label: 'San Marino', value: 'sm'},
      {label: 'Sao Tome and Principe', value: 'st'},
      {label: 'Saudi Arabia', value: 'sa'},
      {label: 'Senegal', value: 'sn'},
      {label: 'Serbia and Montenegro', value: 'cs'},
      {label: 'Seychelles', value: 'sc'},
      {label: 'Sierra Leone', value: 'sl'},
      {label: 'Singapore', value: 'sg'},
      {label: 'Slovakia', value: 'sk'},
      {label: 'Slovenia', value: 'si'},
      {label: 'Solomon Islands', value: 'sb'},
      {label: 'Somalia', value: 'so'},
      {label: 'South Africa', value: 'za'},
      {label: 'South Georgia and the South Sandwich Islands', value: 'gs'},
      {label: 'Spain', value: 'es'},
      {label: 'Sri Lanka', value: 'lk'},
      {label: 'Sudan', value: 'sd'},
      {label: 'Surilabel', value: 'sr'},
      {label: 'Svalbard and Jan Mayen', value: 'sj'},
      {label: 'Swaziland', value: 'sz'},
      {label: 'Sweden', value: 'se'},
      {label: 'Switzerland', value: 'ch'},
      {label: 'Syrian Arab Republic', value: 'sy'},
      {label: 'Taiwan, Province of China', value: 'tw'},
      {label: 'Tajikistan', value: 'tj'},
      {label: 'Tanzania, United Republic of', value: 'tz'},
      {label: 'Thailand', value: 'th'},
      {label: 'Timor-Leste', value: 'tl'},
      {label: 'Togo', value: 'tg'},
      {label: 'Tokelau', value: 'tk'},
      {label: 'Tonga', value: 'to'},
      {label: 'Trinidad and Tobago', value: 'tt'},
      {label: 'Tunisia', value: 'tn'},
      {label: 'Turkey', value: 'tr'},
      {label: 'Turkmenistan', value: 'tm'},
      {label: 'Turks and Caicos Islands', value: 'tc'},
      {label: 'Tuvalu', value: 'tv'},
      {label: 'Uganda', value: 'ug'},
      {label: 'Ukraine', value: 'ua'},
      {label: 'United Arab Emirates', value: 'ae'},
      {label: 'United Kingdom', value: 'gb'},
      {label: 'United States', value: 'us'},
      {label: 'United States Minor Outlying Islands', value: 'um'},
      {label: 'Uruguay', value: 'uy'},
      {label: 'Uzbekistan', value: 'uz'},
      {label: 'Vanuatu', value: 'vu'},
      {label: 'Venezuela', value: 've'},
      {label: 'Viet Nam', value: 'vn'},
      {label: 'Virgin Islands, British', value: 'vg'},
      {label: 'Virgin Islands, U.S.', value: 'vi'},
      {label: 'Wallis and Futuna', value: 'wf'},
      {label: 'Western Sahara', value: 'eh'},
      {label: 'Yemen', value: 'ye'},
      {label: 'Zambia', value: 'zm'},
      {label: 'Zimbabwe', value: 'zw'}
    ]
  },
  /* eslint-enable */
  replaceMarketName (active, text, home, away) {
    /* eslint-disable */
    if (!active) {
      return text
    }
    // console.log('testing', { text, home, away })
    const replaceVisitante = 'Visitante'
    const replaceLVisitante = 'visitante'
    const replaceCasa = 'Casa'
    const replaceLCasa = 'casa'
    const replaceAmbas = 'Ambas as equipes'
    const replaceAmbos = 'Ambos os times'
    const replaceLAmbas = 'ambas as equipes'
    const replaceLAmbos = 'ambos os times'

    const replaceHome = '' + home
    const replaceDraw = 'Empate'
    const replaceAway = '' + away
    const replaceLHome = '' + home.toLowerCase()
    const replaceLDraw = 'empate'
    const replaceLAway = '' + away.toLowerCase()

    // const replaceBoth = '12\\d'
    const reHome = new RegExp(replaceHome, 'g')
    const reDraw = new RegExp(replaceDraw, 'g')
    const reAway = new RegExp(replaceAway, 'g')
    const reLHome = new RegExp(replaceLHome, 'g')
    const reLDraw = new RegExp(replaceLDraw, 'g')
    const reLAway = new RegExp(replaceLAway, 'g')
    const reVisitante = new RegExp(replaceVisitante, 'g')
    const reLVisitante = new RegExp(replaceLVisitante, 'g')
    const reAmbas = new RegExp(replaceAmbas, 'g')
    const reAmbos = new RegExp(replaceAmbos, 'g')
    const reLAmbas = new RegExp(replaceLAmbas, 'g')
    const reLAmbos = new RegExp(replaceLAmbos, 'g')
    const reCasa = new RegExp(replaceCasa, 'g')
    const reLCasa = new RegExp(replaceLCasa, 'g')

    let replaced = text + ''
    replaced = replaced.replace(reHome, '1')
    replaced = replaced.replace(reDraw, 'X')
    replaced = replaced.replace(reAway, '2')
    replaced = replaced.replace(reLHome, '1')
    replaced = replaced.replace(reLDraw, 'X')
    replaced = replaced.replace(reLAway, '2')

    replaced = replaced.replace(reVisitante, '2')
    replaced = replaced.replace(reLVisitante, '2')
    replaced = replaced.replace(reAmbas, 'Ambas')
    replaced = replaced.replace(reAmbos, 'Ambos')
    replaced = replaced.replace(reLAmbas, 'ambas')
    replaced = replaced.replace(reLAmbos, 'ambos')
    replaced = replaced.replace(reCasa, '1')
    replaced = replaced.replace(reLCasa, '1')
    // replaced = replaced.replace(/Bolivia/g, 'mizera')
    return replaced
  },
  getHsl (hex) {
    switch (hex) {
      case 'black':
        hex = '#000000'
        break
      case 'silver':
        hex = '#C0C0C0'
        break
      case 'gray':
        hex = '#808080'
        break
      case 'white':
        hex = '#FFFFFF'
        break
      case 'maroon':
        hex = '#800000'
        break
      case 'red':
        hex = '#FF0000'
        break
      case 'purple':
        hex = '#800080'
        break
      case 'fuchsia':
        hex = '#FF00FF'
        break
      case 'green':
        hex = '#008000'
        break
      case 'lime':
        hex = '#00FF00'
        break
      case 'olive':
        hex = '#808000'
        break
      case 'yellow':
        hex = '#FFFF00'
        break
      case 'navy':
        hex = '#000080'
        break
      case 'blue':
        hex = '#0000FF'
        break
      case 'teal':
        hex = '#008080'
        break
      case 'aqua':
        hex = '#00FFFF'
        break
      case '':
        hex = '#000000'
        break
      case null:
        hex = '#000000'
        break
      default:
        break
    }

    if (!hex) {
      hex = '#000000'
    }

    if (!hex.includes('#')) {
      const s = 0
      const l = 0
      const h = 0
      return { h, s, l }
    }

    hex = hex.replace(/#/g, '')

    if (hex.length === 3) {
      hex = hex.split('').map(function (hex) {
        return hex + hex
      }).join('')
    }

    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex)

    if (!result) {
      return null
    }

    let r = parseInt(result[1], 16)
    let g = parseInt(result[2], 16)
    let b = parseInt(result[3], 16)

    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = (max + min) / 2
    let s = (max + min) / 2
    let l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    s = s * 100
    s = Math.round(s)
    l = l * 100
    l = Math.round(l)
    h = Math.round(360 * h)

    return { h, s, l }
  }
}
export default utils
