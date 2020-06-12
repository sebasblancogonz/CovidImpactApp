import React from 'react'
import { Card } from 'react-native-elements'
import { Table, Row } from 'react-native-table-component'

const Municipality = ({ Municip, Population, Cases, Rate100k, Deaths, Recoveries }) => (
    <Card title={Municip}>
        <Table heightArr={10}>
            <Row data={['Population', Population]} />
            <Row data={['Cases', Cases,]} />
            <Row data={['Rate per 100K habitants', Rate100k]} />
            <Row data={['Deaths', Deaths]} />
            <Row data={['Recoveries', Recoveries]} />
        </Table>
    </Card>
)

export default Municipality