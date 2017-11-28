/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.eclipse.agail;

import org.eclipse.agail.object.DeviceOverview;
import java.util.List;
import org.freedesktop.dbus.DBusInterface;

/**
 *
 * @author koustabhdolui
 */
public interface DeviceFactory extends DBusInterface {
    
    static String AGILE_INTERFACE = "org.eclipse.agail.DeviceFactory";
    /*
    *get a particular device based on the type of device provided as input
    */
    @org.freedesktop.DBus.Description("Returns an instance of Device of specified type")
    public Device getDevice(String deviceType, DeviceOverview deviceOverview) throws Exception;
    
    /*
    *Returns a list of matching device types based on the input device overview
    */
    @org.freedesktop.DBus.Description("Returns a list of matching device types from Device Factory")
    public List<String> MatchingDeviceTypes(DeviceOverview deviceOverview);
    
}
