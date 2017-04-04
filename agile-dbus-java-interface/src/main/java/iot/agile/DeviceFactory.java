/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package iot.agile;

import iot.agile.object.DeviceOverview;
import org.freedesktop.dbus.DBusInterface;

/**
 *
 * @author koustabhdolui
 */
public interface DeviceFactory extends DBusInterface {
    
    static String AGILE_INTERFACE = "iot.agile.DeviceFactory";
    /*
    *get a particular device based on the type of device provided as input
    */
    @org.freedesktop.DBus.Description("Returns an instance of Device of specified type")
    public Device getDevice(String deviceType, DeviceOverview deviceOverview) throws Exception;
    
}
