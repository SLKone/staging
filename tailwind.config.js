module.exports = {
    content: [
      './_layouts/**/*.html',
      './_includes/**/*.html', 
      './_case-studies/**/*.md',
      './_services/**/*.md',
      './_team/**/*.md',
      './_industries/**/*.md',
      './_sub-industries/**/*.md',
      './_sub-services/**/*.md',
      './_e-bizcards/**/*.md',
      './*.md',
    ],
    theme: {
        fontFamily: {
          'display': ['aktiv-grotesk-extended', 'sans-serif'],
          'body': ['aktiv-grotesk', 'sans-serif'],
        },
        extend: {
          colors: {
            emerald: {
              100: '#A7E3D0',
              200: '#6ED1B5',
              300: '#3BCF9A',
              DEFAULT: '#006548', // Set DEFAULT to 400 color
              400: '#006548', // Base color
              500: '#005B3D',
              600: '#004D32',
              700: '#003D26',
            },
            forest: {
              100: '#B2E1B0',
              200: '#8CDDA1',
              300: '#67D493',
              DEFAULT: '#5fbc5b', // Set DEFAULT to 400 color
              400: '#5fbc5b', // Base color
              500: '#4FAF4D',
              600: '#3F9B3E',
              700: '#2F7A2E',
            },
            navy: {
              100: '#A4C8E1',
              200: '#7DAFDF',
              300: '#5B97DB',
              DEFAULT: '#377BBF', // Set DEFAULT to 400 color
              400: '#377BBF', // Base color
              500: '#2E6DAF',
              600: '#245B8D',
              700: '#1A4A6B',
            },
            currant: {
              100: '#4D4F6D',
              200: '#3B3D5B',
              300: '#292B49',
              DEFAULT: '#161A41', // Set DEFAULT to 400 color
              400: '#161A41', // Base color
              500: '#121634',
              600: '#0E1028',
              700: '#0A0C1C',
            },
            tangerine: {
              100: '#FFE0B2',
              200: '#FFCC80',
              300: '#FFB74D',
              DEFAULT: '#F9A618', // Set DEFAULT to 400 color
              400: '#F9A618', // Base color
              500: '#F89B0F',
              600: '#F68F0A',
              700: '#F57C05',
            },
            mustard: {
              100: '#FFF9C4',
              200: '#FFF59D',
              300: '#FFF176',
              DEFAULT: '#FFD54A', // Set DEFAULT to 400 color
              400: '#FFD54A', // Base color
              500: '#FFCA28',
              600: '#FFB300',
              700: '#FFA000',
            },
            cinnabar: {
              100: '#FFAB91',
              200: '#FF8A65',
              300: '#FF7043',
              DEFAULT: '#EF5127', // Set DEFAULT to 400 color
              400: '#EF5127', // Base color
              500: '#E64A19',
              600: '#D84315',
              700: '#BF360C',
            },
            coral: {
              100: '#FF80AB',
              200: '#FF4081',
              300: '#F50057',
              DEFAULT: '#F7278F', // Set DEFAULT to 400 color
              400: '#F7278F', // Base color
              500: '#D5006D',
              600: '#C51162',
              700: '#A5004D',
            },
            blush: {
              100: '#F8BBD0',
              200: '#F48FB1',
              300: '#F06292',
              DEFAULT: '#C14D6C', // Set DEFAULT to 400 color
              400: '#C14D6C', // Base color
              500: '#AD3E5B',
              600: '#9C2D4A',
              700: '#8B1C39',
            },
            plum: {
              100: '#EAB8E4',
              200: '#DAB2D1',
              300: '#C58EBE',
              DEFAULT: '#820776',
              400: '#820776',
              500: '#5B0050',
              600: '#4D0043',
              700: '#3F0036',
            },
            viola: {
              100: '#EAB8D1',
              200: '#D6A3B8',
              300: '#C68DA0',
              DEFAULT: '#C27D84',
              400: '#C27D84',
              500: '#8A4A5B',
              600: '#7A3B4A',
              700: '#6A2C39',
            },
            sand: {
              100: '#F9D6B2',
              200: '#F8CDAF',
              300: '#F7C4AC',
              DEFAULT: '#F2956A',
              400: '#F2956A',
              500: '#D57F3A',
              600: '#C67428',
              700: '#B66A1A',
            },
            amalgam: {
              100: '#F9E6A5',
              200: '#F6D78F',
              300: '#F4C35A',
              DEFAULT: '#F4C35A',
              400: '#F4C35A',
              500: '#D6A84D',
              600: '#B88A3F',
              700: '#9A6C31',
            },
            abyss: {
              100: '#4B4E7A',
              200: '#3E3F6B',
              300: '#242768',
              DEFAULT: '#242768',
              400: '#242768',
              500: '#1E1F5A',
              600: '#191A4D',
              700: '#14163F',
            },                           
        },
        typography: (theme) => ({
          DEFAULT: {
            css: {
              a: {
                color: theme('colors.emerald.400'),
                textDecoration: 'underline',
              },
              h1: {
                fontSize: theme('fontSize.4xl'),
                fontWeight: theme('fontWeight.bold'),
                marginTop: theme('spacing.4'),
                marginBottom: theme('spacing.4'),
              },
              h2: {
                fontSize: theme('fontSize.3xl'),
                fontWeight: theme('fontWeight.semibold'),
                marginTop: theme('spacing.3'),
                marginBottom: theme('spacing.3'),
              },
              h3: {
                fontSize: theme('fontSize.2xl'),
                fontWeight: theme('fontWeight.medium'),
                marginTop: theme('spacing.2'),
                marginBottom: theme('spacing.2'),
              },
              h4: {
                fontSize: theme('fontSize.xl'),
                fontWeight: theme('fontWeight.normal'),
                marginTop: theme('spacing.1'),
                marginBottom: theme('spacing.1'),
              },
              h5: {
                fontSize: theme('fontSize.lg'),
                fontWeight: theme('fontWeight.light'),
                marginTop: theme('spacing.1'),
                marginBottom: theme('spacing.1'),
              },
              h6: {
                fontSize: theme('fontSize.base'),
                fontWeight: theme('fontWeight.light'),
                marginTop: theme('spacing.1'),
                marginBottom: theme('spacing.1'),
              },
            },
          },
        }),
      },
    },
    safelist: [
      {
        pattern: /(bg|text|border|to|from)-(emerald|forest|navy|currant|tangerine|mustard|cinnabar|coral|blush|plum|viola|sand|amalgam|abyss)-(100|200|300|400|500|600|700|DEFAULT)/,
        variants: ['hover', 'dark', 'dark:hover', 'md', 'sm', 'lg'],
      },
      {
        pattern: /(grid-cols-2|grid-cols-3|grid-cols-4|grid-cols-5)/,
        variants: ['md', 'sm', 'lg'],
      },
      {
        pattern: /(px-10|px-20|px-40)/,
        variants: ['md', 'sm', 'lg'],
      },
    ],
    plugins: [
      require('@tailwindcss/typography'),
    ],
}