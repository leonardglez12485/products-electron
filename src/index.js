const {app, BrowserWindow, Menu} = require('electron');
const url = require('url');
const path = require('path');

if(process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
       electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

let mainWindows;
let newProductWindow;
app.on('ready', ()=>{
     mainWindows = new BrowserWindow({
        width: 800,
        height: 600
    })
   // mainWindos.loadFile('index.html');
    mainWindows.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))
  
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    mainWindows.on('closed', ()=>{
        app.quit();
    })
})

function createNewProductWindow(){
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Add a new product'
    });
    newProductWindow.setMenu(null);
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/product.html'),
        protocol: 'file',
        slashes: true
    }))
}

const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Product',
                accelerator: process.platform =='darwin' ? 'command+N' : 'Ctrl+N',
                click(){
                   createNewProductWindow();
                }
            },
            {
                label: 'Remove All Productos',
                click(){

                }
            },
            {
                label: 'Exit',
                accelerator: process.platform =='darwin' ? 'command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

if(process.platform === 'darwin'){
    templateMenu.unshift({
        label: app.getName(),
        submenu: [
                    {
                        label: 'Quit',
                        accelerator: process.platform =='darwin' ? 'command+Q' : 'Ctrl+Q',
                        click(){
                            app.quit();
                        }
                    }
                ]
    })
}

if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                accelerator: process.platform =='darwin' ? 'command+D' : 'Ctrl+D',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}