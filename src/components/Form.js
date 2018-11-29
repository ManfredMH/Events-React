import React,{Component} from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {

    nameEventRef = React.createRef();
    categorieRef = React.createRef();

    showOptions = (key) => {
        const categorie = this.props.categories[key];
        
        const {id, name_localized} = categorie;
        
        if(!id || !name_localized) return null;

        return(
            <option key={id} value={id}>{name_localized}</option>
        );
    }

    searchEvent = (e) => {

        const dataSearch = {
            name: this.nameEventRef.current.value,
            categorie: this.categorieRef.current.value
        }

        this.props.getEvents(dataSearch);

        e.preventDefault();
    }

    render() {

        const categories = Object.keys(this.props.categories);

        return (
            <form onSubmit={this.searchEvent}>
                <fieldset className="uk-fieldset uk-margin">
                    <legend className="uk-legend uk-text-center">
                        Search your event by name or categorie
                    </legend>
                    <div className="uk-column-1-3@m uk-margin">
                        <div className="uk-margin" uk-margin="true" >
                            <input ref={this.nameEventRef} className="uk-input" type="text" placeholder="Event name or city"/>
                        </div>
                        <div className="uk-margin" uk-margin="true" >
                            <select ref={this.categorieRef} className="uk-select">
                                {categories.map(this.showOptions)}
                            </select>
                        </div>
                        <div className="uk-margin" uk-margin="true" >
                            <button className="uk-button uk-button-danger">Search</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        );
    }
}

Form.propTypes = {
    getEvents: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
}