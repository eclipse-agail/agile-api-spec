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
package org.eclipse.agail.exception;

import org.freedesktop.dbus.exceptions.DBusExecutionException;
/**
 * Device not found exception
 */
public class AgileDeviceNotFoundException extends DBusExecutionException {

  /**
   * 
   */
  private static final long serialVersionUID = -7023033132025739002L;

  public AgileDeviceNotFoundException(String arg0) {
    super(arg0);
   }

}
