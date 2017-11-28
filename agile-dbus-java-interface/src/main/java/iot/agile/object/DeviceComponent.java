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
package org.eclipse.agail.object;

import org.freedesktop.dbus.Position;
import org.freedesktop.dbus.Struct;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties({"parameters"})
public class DeviceComponent extends Struct {
  @Position(0)
  @JsonProperty("id")
  public final String id;

  @Position(1)
  @JsonProperty("unit")
  public final String unit;

  @JsonCreator
  public DeviceComponent(@JsonProperty("id") String id, @JsonProperty("unit") String unit) {
    this.id = id;
    this.unit = unit;
  }

}
