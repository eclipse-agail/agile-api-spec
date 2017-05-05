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
package iot.agile.object;

 import org.freedesktop.dbus.Position;
import org.freedesktop.dbus.Struct;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties({"parameters"})
public  final class DeviceOverview extends Struct {
  @Position(0)
  @JsonProperty("id")
  public final String id;
  @Position(1)
  @JsonProperty("protocol")
  public final String protocol;
  @Position(2)
  @JsonProperty("name")
  public final String name;
  @Position(3)
  @JsonProperty("status")
  public final String status;

  @JsonCreator
  public DeviceOverview(@JsonProperty("id") String id, @JsonProperty("protocol") String protocol, @JsonProperty("name") String name, @JsonProperty("status") String status) {
    this.id = id;
    this.protocol= protocol;
    this.name = name;
    this.status = status;
  }
  
  public String getId() {
    return id;
  }

  public String getProtocol() {
    return protocol;
  }

  public String getName() {
    return name;
  }

  public String getStatus() {
    return status;
  }

}
