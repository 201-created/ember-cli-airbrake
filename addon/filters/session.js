export default function setSession(session) {
  return function(notice) {
    notice.session = session;
    return notice;
  };
}
