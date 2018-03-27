/*******************************************************************************
 * Copyright (C) 2017 Create-Net / FBK.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 2.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 * 
 * Contributors:
 *     Create-Net / FBK - initial API and implementation
 ******************************************************************************/
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.eclipse.agail.object;

import org.freedesktop.dbus.DBusConnection;
import org.freedesktop.dbus.DBusInterface;
import org.freedesktop.dbus.exceptions.DBusException;

/**
 *
 * @author Luca Capra <lcapra@create-net.org>
 */
abstract public class AbstractAgileObject implements AgileObjectInterface {

  protected DBusConnection connection;
  protected String busPath;

  @Override
  public void dbusConnect(final String busName, final String busPath, DBusInterface iface) throws DBusException {
    this.busPath = busPath;

    connection = DBusConnection.getConnection(AgileObjectInterface.DEFAULT_DBUS_CONNECTION);

    connection.requestBusName(busName);
    connection.exportObject(busPath, iface);

    // ensure DBus object is unregistered
    Runtime.getRuntime().addShutdownHook(new Thread() {
      public void run() {
        try {
          connection.releaseBusName(busName);
          dbusDisconnect();
        } catch (DBusException ex) {
        }
      }
    });

  }

  @Override
  public void dbusDisconnect() {
    connection.unExportObject(busPath);
    connection.disconnect();
  }

}
