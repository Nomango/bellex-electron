const getters = {
  sidebar: state => state.app.isCollapse,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  institution: state => state.user.institution
}
export default getters
