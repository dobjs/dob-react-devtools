import * as React from 'react'

export default class Highlight extends React.PureComponent<any, any>{
  render() {
    if (!this.props.search || this.props.search === '') {
      return (
        <div>{this.props.label}</div>
      );
    }
    return (
      <span>
        {this.props.label.split(this.props.search)
          .reduce((prev, current, i) => {
            if (!i) {
              return [current];
            }
            return prev.concat(<span className="highlight" key={this.props.search + current + Math.random() * 100}>{this.props.search}</span>, current);
          }, [])
        }
      </span>
    );
  }
}