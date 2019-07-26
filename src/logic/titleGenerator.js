function titleGenerator(pageName,config) {
    document.title = pageName + " | " + config.organisation.name;
}
export default titleGenerator;