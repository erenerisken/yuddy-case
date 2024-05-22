export const sharedColors = {
  black: '#000000',
  blue1: '#E3F2FD',
  blue2: '#BBDEFB',
  blue4: '#2196F3',
  blue5: '#1976D2',
  blue6: '#0D47A1',
  blue7: '#001D6C',
  gray1: '#333333',
  gray2: '#7A7A7A',
  gray3: '#8B8F98',
  gray4: '#ADADAD',
  purple1: '#F3E5F5',
  purple4: '#BA68C8',
  orange1: '#E95F42',
  orange2: '#ff9a52',
  statusGreen: '#008A00',
  statusGreenLightest: '#EBF6EB',
  statusRed: '#AE0000',
  statusRedLightest: '#F7EDED',
  statusYellow: '#EAB600',
  statusYellowDark: '#382C00',
  statusYellowLightest: '#FFFEF1',
  statusOrange: '#ECB010',
  statusOrangeDarkest: '#C18F0A',
  white: '#FFFFFF',
  infoYellow: '#EAB600',
  yellowLightest: '#FFFEF1',
  yellowDark: '#382C00',
  primary: '#3F51B5',
  primaryDark: '#002884',
};

export const sharedStyles = {
  breadcrumbs: {
    fontSize: '13px',
    color: sharedColors.gray1,
  },
  h1: {
    fontWeight: 600,
    fontSize: {
      xs: '18px',
      md: '1.375rem',
    },
  },
  h2: {
    fontWeight: 600,
    fontSize: {
      xs: '1.375rem',
      sm: '1.775rem',
      md: '36px',
    },
  },
  horizontalSpan: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: { xs: 360, sm: 540, md: 720, lg: 960, xl: 1140 },
  },
  shareButton: {
    ml: 1.5,
    color: sharedColors.gray2,
    cursor: 'pointer',
    '&:hover': {
      color: sharedColors.blue5,
    },
  },
};
