import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Lightbox from 'react-images';
import styles from './style.module.css';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
    };
  }

  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious() {
    const { currentImage } = this.state;

    this.setState({
      currentImage: currentImage - 1,
    });
  }

  gotoNext() {
    const { currentImage } = this.state;

    this.setState({
      currentImage: currentImage + 1,
    });
  }

  gotoImage(index) {
    this.setState({
      currentImage: index,
    });
  }

  handleClickImage() {
    const { currentImage } = this.state;
    const { images } = this.props;

    if (currentImage === images.length - 1) {
      return;
    }

    this.gotoNext();
  }

  render() {
    const { currentImage, lightboxIsOpen } = this.state;
    const { images, theme } = this.props;

    return (
      <Fragment>
        <ul className={styles.gallery}>
          {images.map((image, index) => (
            <li key={index} className={styles.gallery__item}>
              <figure>
                <a href={image.fluid.srcSet} onClick={(event) => this.openLightbox(index, event)}>
                  <Img fluid={image.fluid} />
                </a>
              </figure>
            </li>
          ))}
        </ul>
        <Lightbox
          backdropClosesModal={true}
          currentImage={currentImage}
          images={images.map((image) => image.fluid)}
          isOpen={lightboxIsOpen}
          onClickImage={() => this.handleClickImage()}
          onClickNext={() => this.gotoNext()}
          onClickPrev={() => this.gotoPrevious()}
          onClickThumbnail={() => this.gotoImage()}
          onClose={() => this.closeLightbox()}
          theme={theme}
        />
      </Fragment>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape()),
  theme: PropTypes.shape(),
};

export default Gallery;

// https://github.com/jossmac/react-images/blob/master/examples/src/components/Gallery.js
// https://github.com/iammatthias/.com/blob/master/src/components/Gallery/GalleryGrid.js
