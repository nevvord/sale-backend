const router = express()

const { getWorks, postWork } = require('./works')
const { getTechnologies, postTechnology } = require('./technologies')
const deleteTecnology = require('./technologies/delete')
const { getProjects, postProject } = require('./projects')
const deleteProject = require('./projects/delete')
const putPtojectInner = require('./projects/put-inner')
const putProject = require('./projects/put-project')
const { getSpecializations, postSpecialization } = require('./specializations')
const { getPage, postPage } = require('./pages')


router
  //===== Works =====
  .get('/works', getWorks)
  .post('/addwork', multer.single('image'), postWork)
  //===== Technologies =====
  .get('/technologies', getTechnologies)
  .post('/addtechnology', multer.single('image'), postTechnology)
  .delete('/deletetechnology/:id', deleteTecnology)
  //===== Projects =====
  .get('/projects', getProjects)
  .post('/addproject', multer.single('image'), postProject)
  .delete('/deleteproject/:id', deleteProject)
  .put('/putprojectinner', putPtojectInner)
  .put('/putproject/:id', multer.single('image'), putProject)
  //===== Specializations =====
  .get('/specializations', getSpecializations)
  .post('/addspecialization', multer.single('image'), postSpecialization)
  //===== Page =====
  .get('/pages', getPage)
  .post('/addpage', multer.single('image'), postPage)


module.exports = router
