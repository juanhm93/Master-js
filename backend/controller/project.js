'use strict'
// importando modelo project
var Project = require('../models/projects')
const { param } = require('../routes/project')

var controller = {

    home: function( req , res ){
        return res.status(200).send({
            message:'soy la home de project'
        })
    },
    test: function( req , res){
        return res.status(200).send({
            message:'soy el metodo test de  project'
        })
    },

    saveProject: function( req , res){
        var project = new Project()
        var params = req.body

        project.name = params.name
        project.description = params.description
        project.category = params.category
        project.year = params.year
        project.langs = params.langs
        project.image = null

        project.save( ( err ,projectStored ) => {
            
            if(err) return res.status(500).send({message:'error al guardar'})

            if(!projectStored) return res.status(404).send({message:'no se ha podido guardar el projecto'})

            //si no ocurre error ejecuta esto
            return res.status(200).send({project:projectStored})

        })
    },

    getProject: function(  req , res ){
        var projectId = req.params.id

        if(projectId == null) return res.status(404).send({message:'el proyecto no existe primera condicion'})

        Project.findById( projectId , ( err , project ) =>{

            if(err) return res.status(500).send({message:'error al devolver los datos'})

            if(!project) return res.status(404).send({message:'el proyecto no existe segunda condicion'})

            return res.status(200).send({
                project:project
            })

        } )
    },

    getProjects: function( req , res ){
  
        //{condiciones = where en sql}
        //sort ordenar
        Project.find({}).sort('year').exec(( err , projects ) =>{
            if(err) return res.status(500).send({message:'error al devolver los datos'})

            if(!projects) return res.status(404).send({message:'no hay proyectos apra mostrar'})

            return res.status(200).send( {projects} )
        })
    
    },

    updateProject: function( req , res ){
        var projectId = req.params.id
        //aqui estan los datos nuevos
        var update = req.body

        //retorna el objeto antiguo, si le pasas como 3er parametro {new:true} pasa el objeto actualizado
        Project.findByIdAndUpdate(projectId , update , {new:true} , (err , projectUpdated) =>{

            if(err) return res.status(500).send({message:'error al actualizar'})

            if(!projectUpdated) return res.status(404).send({message:'no existe el projecto a actualizar'})

            return res.status(200).send({project:projectUpdated})

        })
    },

    deleteProject: function( req , res){

        var projectId = req.params.id
        Project.findByIdAndDelete( projectId , (err , projectRemove )=>{

            if(err) return res.status(500).send({message:'no se ha podido borrar el projecto'})
            if(!projectRemove) return res.status(404).send({message:'no se puede eliminar ese projecto'})

            return res.status(200).send({
                project:projectRemove
            })

        } )

    }

}

module.exports = controller