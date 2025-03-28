function mapApplicationStatus(status) {
  const statusMapping = {
    pending: '審核中',
    approved: '已核准',
    rejected: '已駁回',
  }
  return statusMapping[`${status}`]
}
export { mapApplicationStatus }
