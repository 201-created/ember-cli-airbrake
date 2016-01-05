export default function setSession(session) {
  return function setSession$filter(notice) {
    notice.session = session;
    return notice;
  };
}
