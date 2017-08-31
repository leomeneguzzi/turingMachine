import {BrowserWindow} from 'electron';
import * as path from 'path';
import * as url from 'url';

export default class Main {

  static mainWindow : Electron.BrowserWindow;
  static BrowserWindow : typeof BrowserWindow;
  static App : Electron.App;

  private static createWindow(){
    Main.mainWindow = new BrowserWindow({
      width: 1600,
      height: 1000
    });
    Main.mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../html', 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
    Main.mainWindow.on('closed', Main.onClosed);
  }

  private static onReady() {
    Main.createWindow();
  }

  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      Main.App.quit()
    }
  }

  private static onClosed(){
    Main.mainWindow = null;
  }

  private static onActivate(){
    if (Main.mainWindow === null) {
      Main.createWindow();
    }
  }

  static main( app: Electron.App, browserWindow: typeof BrowserWindow){
    Main.BrowserWindow = browserWindow;
    Main.App = app;
    Main.App.on('window-all-closed', Main.onWindowAllClosed);
    Main.App.on('ready', Main.onReady);
    Main.App.on('activate', Main.onActivate);
  }
}