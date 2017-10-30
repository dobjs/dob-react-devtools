import styled, { keyframes, injectGlobal } from 'styled-components'

const borderAnimation = keyframes`
	0% {
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.1);
    border: 2px solid rgba(0, 0, 0, 0.5);
  }
  
  30% {
    box-shadow: inset 0 0 3px transparent;
    background-color: transparent;
  }

  80% {
    box-shadow: inset 0 0 3px transparent;
  }

	100% {
    box-shadow: inset 0 0 3px transparent;
    border: 2px solid transparent;
	}
`;

export const Container = styled.div`
  pointer-events: all;
`

export const HighLightBox = styled.div`
  position: absolute;
  z-index: 100;
  pointer-events: none;
  box-sizing: border-box;
  &.dob-debug-animation{
    animation: ${borderAnimation} 3s 1;
  }
`

export const DebugContainer = styled.div`
  position: absolute;
  z-index: 101;
`

export const CountTag = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2px 7px;
  text-shadow: 1px 1px #ccc, 0px 0px #111;
  color: transparent;
  z-index: 100;
  box-shadow: 0 0 10px #3e3e3e;
`

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-shadow: 1px 1px #ccc, 0px 0px #111;
  color: transparent;
  width: 300px;
  background-color: #333;
  box-shadow: 0 0 10px #3e3e3e;
`

export const CallContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #4a4a4a;
  padding: 5px 10px;
  text-shadow: 1px 1px #aaa, 0px 0px #111;
`

export const CallNumber = styled.div`
  display: flex;
`

export const ActionScroll = styled.div`
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar-thumb {
    background-color: #444;
  }
  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    background-color: #111;
  }
`

export const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid black;
`

export const RenderCount = styled.div`
  ${props => props.theme && props.theme.level === 'normal' && `
    text-shadow: 1px 1px #ccc, 0px 0px #111;
  `}
  ${props => props.theme && props.theme.level === 'frequently' && `
    text-shadow: 1px 1px #eee, 0px 0px #111;
  `}
  ${props => props.theme && props.theme.level === 'warning' && `
    text-shadow: 1px 1px #e4df2b, 0px 0px #111;
  `}
  ${props => props.theme && props.theme.level === 'danger' && `
    text-shadow: 1px 1px #e0641b, 0px 0px #111;
  `}
`

export const ActionContainer = styled.div`
  display: flex;
  padding: 5px;
  &:not(:first-child) {
    border-top: 1px solid black;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #4a4a4a;
  }
  transition: text-shadow background-color .1s;
  &:hover {
    text-shadow: 1px 1px #eee, 0px 0px black;
    background-color: #3a3a3a;
  }
  cursor: pointer;
`