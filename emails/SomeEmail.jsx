import React, { Component } from "react"
import PropTypes from "prop-types"

export default class SomeEmail extends Component {

  static propTypes = {
    blah: PropTypes.number
  }

  render() {
    return (
      <div className="SomeEmail">
        this is an email! {this.props.blah}
      </div>
    )
  }

}
