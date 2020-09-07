import styled from "styled-components";

const Slider = styled.input`
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: calc(100% - 16pxpx); /* Specific width is required for Firefox. */
  background: ${(props) =>
    props.theme.colors.red[1]} /* Otherwise white in Chrome */
  };
  border-radius: 8px;
  height: 16px;
  padding: 12px;
  margin: 8px;
  display: ${props => props.display};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.gray[4]};
    cursor: pointer;
    margin-top: -16px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    transform: translateY(50%);
  }

  /* All the same stuff for Firefox */
  &::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.gray[4]};
    cursor: pointer;
  }

  /* All the same stuff for IE */
  &::-ms-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.gray[4]};
    cursor: pointer;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: #3071a9;
    border-radius: 1.3px;
  }

  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #367ebd;
  }

  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
  }

  &::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #2a6495;
    border-radius: 2.6px;
  }
  &:focus::-ms-fill-lower {
    background: #3071a9;
  }
  &::-ms-fill-upper {
    background: #3071a9;
    border-radius: 2.6px;
  }
  &:focus::-ms-fill-upper {
    background: #367ebd;
  }
`;

export default Slider;
