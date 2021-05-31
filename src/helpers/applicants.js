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

export const getSortedApplications = ({sort, applications}) => {
  let output = applications

  if (applications.length) {
    output = output.sort((app1, app2) => {
      if (sort.by === 'id') {
        if (sort.direction == 'desc') {
          if (app1.id > app2.id) return 1
          else return -1
        } else if (sort.direction == 'asc') {
          if (app1.id > app2.id) return -1
          else return 1
        }
      } else if (sort.by === 'full_name') {
        if (sort.direction == 'desc') {
          if (app1.applicant.full_name < app2.applicant.full_name) return 1
          else return -1
        }
        if (sort.direction == 'asc') {
          if (app1.applicant.full_name < app2.applicant.full_name) return -1
          else return 1
        }
      } else if (sort.by === 'application_status') {
        if (sort.direction == 'desc') {
          if (app1.status < app2.status) return 1
          else return -1
        }
        if (sort.direction == 'asc') {
          if (app1.status < app2.status) return -1
          else return 1
        }
      }
    })
  }

  return output
}

export const isInApplicants = application => {
  return (
    !application.deleted &&
    ((application.status == 0 && application.settlement.status == 0) ||
      (application.status == 1 && application.settlement.status == 0))
  )
}

export const isInSettlement = application => {
  return (
    !application.deleted &&
    application.status == 1 &&
    application.settlement.status == 1
  )
}

export const isInBasket = application => {
  return application.deleted || application.status == 2
}

export const isInEvicted = application => {
  return !application.deleted && application.settlement.status == 2
}
