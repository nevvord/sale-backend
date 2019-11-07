const router = express()

//===== Work =====
const { getWorks, postWork } = require('./works')
const deleteWork = require('./works/delete')
const putWorkInner = require('./works/put-inner')
const putWork =  require('./works/put-work')
//===== Technology =====
const { getTechnologies, postTechnology } = require('./technologies')
const deleteTecnology = require('./technologies/delete')
//===== Project =====
const { getProjects, postProject } = require('./projects')
const deleteProject = require('./projects/delete')
const putPtojectInner = require('./projects/put-inner')
const putProject = require('./projects/put-project')
//===== Specialization =====
const { getSpecializations, postSpecialization } = require('./specializations')
const deleteSpecialization = require('./specializations/delete')
const putSpecializationInner = require('./specializations/put-inner')
const putSpecialization = require('./specializations/put-specialization')
//===== Page =====
const { getPage, postPage } = require('./pages')
const deletePage = require('./pages/delete')
const putPage = require('./pages/put')
const putPagePosition = require('./pages/putPagePosition')
//===== Files =====
const { getFiles, postFile} = require('./files')
const deleteFile = require('./files/delete')
//===== Security =====
const security = require('./security')

router
    //===== Get =====
    .get('/getfiles', getFiles)
    .get('/works', getWorks)
    .get('/technologies', getTechnologies)
    .get('/projects', getProjects)
    .get('/specializations', getSpecializations)
    .get('/pages', getPage)
    //==== Security ====
    .use(security)
    //===== Files =====
    .post('/addfile', multer.single('image'), postFile)
    .delete('/deletefile/:id', deleteFile)
    //===== Works =====
    .post('/addwork', multer.single('image'), postWork)
    .delete('/deletework/:id', deleteWork)
    .put('/putworkinner', putWorkInner)
    .put('/putwork/:id', multer.single('image'), putWork)
    //===== Technologies =====
    .post('/addtechnology', multer.single('image'), postTechnology)
    .delete('/deletetechnology/:id', deleteTecnology)
    //===== Projects =====
    .post('/addproject', multer.single('image'), postProject)
    .delete('/deleteproject/:id', deleteProject)
    .put('/putprojectinner', putPtojectInner)
    .put('/putproject/:id', multer.single('image'), putProject)
    //===== Specializations =====
    .post('/addspecialization', multer.single('image'), postSpecialization)
    .delete('/deletespecialization/:id', deleteSpecialization)
    .put('/putspecializationinner', putSpecializationInner)
    .put('/putspecialization/:id', multer.single('image'), putSpecialization)
    //===== Page =====
    .post('/addpage', postPage)
    .delete('/deletepage/:id', deletePage)
    .put('/putpage/:id', putPage)
    .put('/putpageposition/:id', putPagePosition)


module.exports = router
