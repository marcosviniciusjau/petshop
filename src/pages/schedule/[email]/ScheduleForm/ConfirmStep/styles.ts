import { Box, styled, Text } from '@marcos-vinicius-design-system/react'

export const ConfirmForm = styled(Box, {
  maxWidth: 540,
  margin: '$6 auto 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  paddingBottom: '$6',
  marginBottom: '$2',
  borderBottom: '1px solid $gray600',

  [`> ${Text}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    svg: {
      color: '$gray200',
      width: '$5',
      height: '$5',
    },
  },
})

export const FormError = styled(Text, {
  color: '#F75A68',
})

export const FormActions = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$2',
  marginTop: '$2',
})
export const Select = styled('select', {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor:' #fff',
    color: '#333',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    '&:focus' : {
      borderColor:'#FF644D',
    }
  },
  
)