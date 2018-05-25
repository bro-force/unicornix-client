import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AppContext from './AppContext'

import Medal from './icons/Medal'
import Home from './icons/Home'
import Github from './icons/Github'

import './styles/ranking.css'

const Ranking = () => {
  return (
    <div className="ranking">
      <h1 className="ranking__title">Ranking</h1>

      <div className="ranking__table-wrapper">
        <table className="ranking__table">
          <thead>
            <tr className="ranking__row">
              <th className="ranking__header"></th>
              <th className="ranking__header">Nickname</th>
              <th className="ranking__header">Pontuação</th>
            </tr>
          </thead>
          <tbody>
            <AppContext.Consumer>
              { context => {
                return context.ranking.map((item, index) => (
                  <tr
                    key={`${item.points}:${index}`}
                    className="ranking__row"
                  >
                    <td className="ranking__data">
                      <Medal
                        className="ranking__medal"
                        position={index + 1}
                      />
                    </td>
                    <td className="ranking__data">
                      { item.nickname }
                      { item.createdAt && (
                        <small className="ranking__date">{ moment(item.createdAt).format('DD/MM/YYYY') }</small>
                      )}
                    </td>
                    <td className="ranking__data"> { item.points } </td>
                  </tr>
                ))
              }}
            </AppContext.Consumer>
          </tbody>
        </table>
      </div>

      <div className="result__options">
        <div className="result__option-item">
          <Link to="/">
            <button
              className="result__restart"
            >
              <Home className="result__restart-icon" />
            </button>
          </Link>
        </div>

        <div className="result__option-item">
          <a
            href="https://github.com/bro-force"
            target="blank"
          >
            <button
              className="result__restart"
            >
              <Github className="result__restart-icon" />
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Ranking
