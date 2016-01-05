export default function setEnvironment(environment) {
  return function setEnvironment$filter(notice) {
    notice.context.environment = environment;
    return notice;
  };
}
