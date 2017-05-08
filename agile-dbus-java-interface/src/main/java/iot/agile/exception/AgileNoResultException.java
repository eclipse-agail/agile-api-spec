/*******************************************************************************
 * Copyright (C) 2017 Create-Net / FBK.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     Create-Net / FBK - initial API and implementation
 ******************************************************************************/
package iot.agile.exception;

import org.freedesktop.dbus.exceptions.DBusExecutionException;

/**
 * As the current version of DBus Java is unable to send null values over DBus
 * messaging system. For this, in case of null results this exception will be
 * throw, so that the DBus client can understand the value is null, and handle
 * the issue accordingly
 * 
 * @author dagi
 *
 */
public class AgileNoResultException extends DBusExecutionException {

  /**
   * 
   */
  private static final long serialVersionUID = -3571320653384533655L;

  public AgileNoResultException(String arg0) {
    super(arg0);
  }

}
