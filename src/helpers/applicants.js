export const getFilteredApplications = ({filter, applications}) => {
  let output = applications

  if (filter.length) {
    if (output.length) {
      output = output.filter(application => {
        let isPass = []

        filter.map(item => {
          switch (item.by) {
            case 'payment_method':
              if (application.applicant.payment_method.id == item.value)
                isPass.push(true)
              break
            case 'application_status':
              if (application.status == item.value) isPass.push(true)
              break
            case 'settlement_status':
              if (application.settlement.status == item.value) isPass.push(true)
              break
            case 'study_place':
              if (application.applicant.study_place.id == item.value)
                isPass.push(true)
              break
          }
        })

        return isPass.length == filter.length
      })
    }
  }

  return output
}
