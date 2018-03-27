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
package org.eclipse.agail.object;

import org.freedesktop.dbus.DBusConnection;
import org.freedesktop.dbus.DBusInterface;
import org.freedesktop.dbus.exceptions.DBusException;

/**
 *
 * @author Luca Capra <lcapra@create-net.org>
 */
public interface AgileObjectInterface {
  
  public static int DEFAULT_DBUS_CONNECTION = DBusConnection.SESSION;
  
  public void dbusConnect(String busName, String busPath, DBusInterface iface) throws DBusException;
  public void dbusDisconnect();
  
}
