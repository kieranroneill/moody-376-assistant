'use client';
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';

// components
import Close from './components/Close';
import Content from './components/Content';
import Description from './components/Description';
import Footer from './components/Footer';
import Header from './components/Header';
import Overlay from './components/Overlay';
import Portal from './components/Portal';
import Title from './components/Title';
import Trigger from './components/Trigger';

// types
import type { Component, Props } from './types';

const Sheet: Component<Props> = (props) => {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
};

Sheet.Close = Close;
Sheet.Content = Content;
Sheet.Description = Description;
Sheet.Footer = Footer;
Sheet.Header = Header;
Sheet.Overlay = Overlay;
Sheet.Portal = Portal;
Sheet.Title = Title;
Sheet.Trigger = Trigger;

export default Sheet;
