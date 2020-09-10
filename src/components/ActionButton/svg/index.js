import React from "react";
import { useTheme } from "styled-components";
import Box from "ui/Box";
import {
  trashCan,
  sortingArrow,
  downArrow,
  link,
  pencil,
  heart,
  playlist,
  eye,
  play,
  paperClip,
  download,
  forward,
  previous,
  volume,
  noVolume,
  musicNotes,
  pause,
  video,
  vinyl,
  plusSign,
  minusSign,
  backArrow,
  scratch,
  archive,
  xMark,
  post,
  user,
  musicPlaylist,
  tv,
  arrowRightCircle,
  search,
  archiveFolder,
  windows,
  apple,
  linux,
  support,
  network,
  art,
  artFilled,
  whatsapp,
  facebook,
  twitter,
  save,
  bpm,
  power
} from "./paths";

const paths = {
  trashCan,
  sortingArrow,
  downArrow,
  link,
  pencil,
  heart,
  playlist,
  eye,
  play,
  paperClip,
  download,
  forward,
  previous,
  volume,
  noVolume,
  musicNotes,
  pause,
  video,
  vinyl,
  plusSign,
  minusSign,
  backArrow,
  scratch,
  archive,
  xMark,
  post,
  user,
  musicPlaylist,
  tv,
  arrowRightCircle,
  search,
  archiveFolder,
  windows,
  apple,
  linux,
  support,
  network,
  art,
  artFilled,
  whatsapp,
  facebook,
  twitter,
  save,
  bpm,
  power
};

const svgCreator = ({ path, icon }) => ({
  size = "24",
  viewBox = "0 0 24 24",
  fill,
  margin = 0,
  onClick,
  style,
}) => {
  const theme = useTheme();

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      margin={margin}
      onClick={onClick}
      css={style}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${size}px`}
        height={`${size}px`}
        viewBox={viewBox}
        fill={fill || theme.colors.black}
      >
        <path d={path} />
      </svg>
    </Box>
  );
};

const Icon = ({
  size = "24",
  viewBox = "0 0 24 24",
  fill = 'gray',
  tint = 8,
  margin = 0,
  onClick,
  customStyle,
  disabled,
  icon,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Box
      as="span"
      justifyContent="center"
      alignItems="center"
      margin={margin}
      onClick={!disabled && onClick}
      css={customStyle}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${size}px`}
        height={`${size}px`}
        viewBox={viewBox}
        fill={
          disabled
            ? theme.colors.gray[3]
            : tint ? theme.colors[fill][tint] : fill || theme.colors.black
        }
      >
        <path d={paths[icon]} />
      </svg>
    </Box>
  );
};

const Save = svgCreator({ path: save });
const TrashCan = svgCreator({ path: trashCan });
const SortingArrow = svgCreator({ path: sortingArrow });
const DownArrow = svgCreator({ path: downArrow });
const LinkIcon = svgCreator({ path: link });
const Edit = svgCreator({ path: pencil });
const Heart = svgCreator({ path: heart });
const Playlist = svgCreator({ path: playlist });
const Watch = svgCreator({ path: eye });
const Play = svgCreator({ path: play });
const PaperClip = svgCreator({ path: paperClip });
const Download = svgCreator({ path: download });
const Forward = svgCreator({ path: forward });
const Previous = svgCreator({ path: previous });
const Volume = svgCreator({ path: volume });
const NoVolume = svgCreator({ path: noVolume });
const MusicNotes = svgCreator({ path: musicNotes });
const Pause = svgCreator({ path: pause });
const Video = svgCreator({ path: video });
const Vinyl = svgCreator({ path: vinyl });
const Plus = svgCreator({ path: plusSign });
const Minus = svgCreator({ path: minusSign });
const BackArrow = svgCreator({ path: backArrow });
const Scratch = svgCreator({ path: scratch });
const Archive = svgCreator({ path: archive });
const XMark = svgCreator({ path: xMark });
const PostIcon = svgCreator({ path: post });
const User = svgCreator({ path: user });
const MusicPlaylist = svgCreator({ path: musicPlaylist });
const TV = svgCreator({ path: tv });
const Search = svgCreator({ path: search });
const ArrowRightCircle = svgCreator({ path: arrowRightCircle });
const ArchiveFolder = svgCreator({ path: archiveFolder });
const Windows = svgCreator({ path: windows });
const Apple = svgCreator({ path: apple });
const Linux = svgCreator({ path: linux });
const Support = svgCreator({ path: support });
const Network = svgCreator({ path: network });
const Art = svgCreator({ path: art });
const ArtFilled = svgCreator({ path: artFilled });

const icons = {
  windows: Windows,
  apple: Apple,
  linux: Linux,
  like: Heart,
  addVideo: Playlist,
  removeVideo: TrashCan,
  watch: Watch,
  play: Play,
  paperclip: PaperClip,
  download: Download,
  previous: Previous,
  forward: Forward,
  musicNotes: MusicNotes,
  volume: Volume,
  noVolume: NoVolume,
  pause: Pause,
  video: Video,
  vinyl: Vinyl,
  plusSign: Plus,
  minusSign: Minus,
  link: LinkIcon,
  backArrow: BackArrow,
  scratch: Scratch,
  archive: Archive,
  post: PostIcon,
  user: User,
  search: Search,
  arrowRightCircle: ArrowRightCircle,
  archiveFolder: ArchiveFolder,
  sortingArrow: SortingArrow,
  support: Support,
  network: Network,
  art: Art,
  artFilled: ArtFilled,
  save: Save
};

export {
  User,
  MusicPlaylist,
  ArrowRightCircle,
  TrashCan,
  SortingArrow,
  DownArrow,
  LinkIcon,
  Edit,
  Heart,
  Playlist,
  Watch,
  Play,
  PaperClip,
  Download,
  Forward,
  Previous,
  Volume,
  NoVolume,
  MusicNotes,
  Pause,
  Video,
  Vinyl,
  Plus,
  Minus,
  BackArrow,
  Scratch,
  Archive,
  XMark,
  PostIcon,
  TV,
  Search,
  ArchiveFolder,
  Windows,
  Apple,
  Linux,
  Support,
  Network,
  Art,
  ArtFilled,
  Save,
  icons,
};

export default Icon;
