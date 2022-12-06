import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
    render() {
      const {
        name,
      } = this.props;

      return (
        <header class="header-component">
            <img
         class="logo-resize2"
         src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
         alt="PokeLogo"
         />
            <h3>Olá, {name}</h3>
        </header>
      );
    }
  }
  
  Header.propTypes = {
    name: PropTypes.string,
  }.isRequired;
  

export default Header;
