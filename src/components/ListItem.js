import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    NativeModules,
    LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';

import { CardSection } from './common';
import * as actions from '../actions';

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental(true);

class ListItem extends Component {
    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    renderDescription() {
        const { item, expanded } = this.props;

        if (expanded) {
            return (
                <CardSection>
                    <Text style={styles.descriptionStyle}>
                        {item.description}
                    </Text>
                </CardSection>
            );
        }
    }

    render() {
        const { titleStyle } = styles;
        const { title, id } = this.props.item;

        return (
            <TouchableWithoutFeedback
                onPress={() => this.props.selectLibrary(id)}
            >
                <View>
                    <CardSection>
                        <Text style={titleStyle}>
                            {title}
                        </Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        color: '#000',
        fontSize: 18,
        paddingLeft: 15,
        fontWeight: '600'
    },
    descriptionStyle: {
        flex: 1,
        color: '#000',
        fontSize: 16,
        paddingLeft: 10
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.item.id;
    return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
