'use strict'

function home(req, res){
    res.status(200).send(`
        <h1>Bienvenido a la página de inicio</h1>
        <div id="content" style="text-align: center; border: solid 5px blue; ">
            <p style="padding-bottom: 10px">Esta es la página de inicio de la aplicación</p>
            <img src="/images/porsche.jpg" style="height: 200px" alt="Porsche 911">
            <img src="/images/Heboresnow.png" style="height: 200px">
        </div>
        <h2>¿Qué es esto?</h2>
        <p>Esto es una aplicación de desarrollo web</p>
    `);
}

module.exports = {
    home
}