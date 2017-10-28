import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  display: flex;
  position: relative;
  font-family: Helvetica,'microsoft yahei',Arial,sans-serif;
  height: 100%;
  width: 100%;
`

export const ChildrenContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  flex-grow: 1;
  flex-basis: 0;
`

export const ToolContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 350px;
  background-color: #333;
  color: whitesmoke;
  border-left: 1px solid black;
  box-shadow: 0 0 10px #3e3e3e;
`

export const ScrollContainer = styled.div`

`

export const HelperContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #4a4a4a;
`

export const HelperInput = styled.input`
  width: 100%;
  background-color: transparent;
  padding: 7px 10px;
  border: none;
  outline: none;
  color: whitesmoke;
  font-size: 14px;
  transition: background-color .1s;
  &:focus {
    background-color: #444;
  }
  border-right: 1px solid black;
`

export const HelperButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  border: none;
  outline: none;
  background-color: transparent;
  color: transparent;
  text-shadow: 1px 1px #888, 0px 0px #000;
  border-left: 1px solid #4a4a4a;
  font-size: 13px;
  padding: 5px;
  cursor: pointer;
  transition: background-color .1s;
  &:hover {
    background-color: #444;
    text-shadow: 1px 1px #aaa, 0px 0px #000;
  }
`

export const ToolScrollContainer = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  overflow-y: auto;
  overflow-x: hidden;
  border-top: 1px solid black;
  &::-webkit-scrollbar-thumb {
    background-color: #444;
  }
  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    background-color: #111;
  }
`

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  &:not(:first-child) {
    border-top: 1px solid black;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #4a4a4a;
  }
  transition: background-color .1s;
`

export const ControlContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0;
  right: 351px;
  z-index: 99;
  box-shadow: 0 0 10px #3e3e3e;
  ${props => !props.theme.showToolBox && `
    right: 0;
  `}
`

export const DisplayButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 33px;
  background-color: #333;
  fill: #ccc;
  cursor: pointer;
  transition: background-color, fill .1s;
  &:hover {
    fill: #ddd;
    background-color: #444;
  }
`

export const UseDebug = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 33px;
  background-color: #333;
  fill: #ccc;
  cursor: pointer;
  transition: background-color, fill .1s;
  &:hover {
    fill: #ddd;
    background-color: #444;
  }
`