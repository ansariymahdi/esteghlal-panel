import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import windowSize from 'react-window-size';

import Aux from "../../../../../../hoc/_Aux";
import NavIcon from "./../NavIcon";
import NavBadge from "./../NavBadge";
import * as actionTypes from "../../../../../../store/actions";

class NavItem extends Component {

    render() {
        // var isActive = this.context.router.route.location.pathname === this.props.to;
        // var className = isActive ? 'active' : '';
        let itemTitle = this.props.item.title;
        if (this.props.item.icon) {
            itemTitle = <span className="pcoded-mtext">{this.props.item.title}</span>;
        }

        let itemTarget = '';
        if (this.props.item.target) {
            itemTarget = '_blank';
        }

        let subContent;
        if (this.props.item.external) {
            subContent = (
                <a href={this.props.item.url} target='_blank' rel='noopener noreferrer'>
                    <NavIcon items={this.props.item} />
                    {itemTitle}
                    <NavBadge layout={this.props.layout} items={this.props.item} />

                </a>
            );
        } else {
            console.log(this.props.prefix)
            subContent = (
                <Link to={`${this.props.prefix}${this.props.item.url}`} className="nav-link" exact={true} target={itemTarget} activeClassName="active" >
                    <NavIcon items={this.props.item} />
                    {itemTitle}
                    <NavBadge layout={this.props.layout} items={this.props.item} />

                </Link>
            );
        }
        let mainContent = '';
        if (this.props.layout === 'horizontal') {
            mainContent = (
                <li onClick={this.props.onItemLeave}>{subContent}</li>
            );
        } else {
            if (this.props.windowWidth < 992) {
                mainContent = (
                    <li className={this.props.item.classes} onClick={this.props.onItemClick}>{subContent}</li>
                );
            } else {
                mainContent = (
                    <li className={this.props.item.classesz}>{subContent}</li>
                );
            }
        }

        return (
            <Aux>
                {mainContent}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        layout: state.layout,
        collapseMenu: state.collapseMenu
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onItemClick: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
        onItemLeave: () => dispatch({ type: actionTypes.NAV_CONTENT_LEAVE })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(NavItem));
